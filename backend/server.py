from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError, PyMongoError
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, model_validator
from typing import List
import uuid
from datetime import datetime, timezone, timedelta

import bcrypt
import jwt
import shutil


# ================= ENV =================
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

SECRET_KEY = os.environ.get("SECRET_KEY", "SUPER_SECRET_KEY")
ALGORITHM = "HS256"


# ================= MongoDB =================
mongo_url = os.environ.get("MONGO_URL") or os.environ.get("DB_URL")
if not mongo_url:
    raise RuntimeError("Mongo connection string is missing. Set MONGO_URL or DB_URL.")

db_name = os.environ.get("DB_NAME", "souq_alraqqa")
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]


# ================= APP =================
app = FastAPI()
api_router = APIRouter(prefix="/api")


# ================= MODELS =================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# ================= AUTH MODELS =================

class UserRegister(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str
    confirm_password: str

    @model_validator(mode="after")
    def validate_passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Password and confirm password do not match")
        return self


class UserLogin(BaseModel):
    email: str
    password: str


# ================= AUTH FUNCTIONS =================

def hash_password(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str):
    return bcrypt.checkpw(password.encode(), hashed.encode())


def create_token(user_id: str):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


# ================= AUTH ROUTES =================

@api_router.post("/auth/register")
async def register(user: UserRegister):
    try:
        existing = await db.users.find_one({"email": user.email})

        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")

        hashed_password = hash_password(user.password)

        new_user = {
            "id": str(uuid.uuid4()),
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "password": hashed_password
        }

        await db.users.insert_one(new_user)

        token = create_token(new_user["id"])

        return {"access_token": token}
    except HTTPException:
        raise
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except PyMongoError:
        logger.exception("Database error during registration")
        raise HTTPException(status_code=503, detail="Database error")
    except Exception:
        logger.exception("Unexpected registration error")
        raise HTTPException(status_code=500, detail="Unable to register user")


@api_router.post("/auth/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Wrong password")

    token = create_token(db_user["id"])

    return {"access_token": token}


@api_router.get("/me")
async def get_me(user_id: str = Depends(get_current_user)):
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


# 🔥 Dashboard API
@api_router.get("/dashboard")
async def dashboard():
    try:
        users_count = await db.users.count_documents({})
    except:
        users_count = 0

    return {
        "users": users_count,
        "ads": 0,
        "visitors": 0,
        "bounce": 0
    }

# ================= NEW: IMAGE UPLOAD =================

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@api_router.post("/user/upload-image")
async def upload_image(file: UploadFile = File(...), user_id: str = Depends(get_current_user)):

    filename = f"{user_id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/static/uploads/{filename}"

    await db.users.update_one(
        {"id": user_id},
        {"$set": {"image": image_url}}
    )

    return {"image_url": image_url}


# مثال API محمي
@api_router.get("/protected")
async def protected(user_id: str = Depends(get_current_user)):
    return {"message": f"Hello user {user_id}"}


# ================= BASIC API =================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


# ================= ROUTER =================

app.include_router(api_router)


# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= LOGGING =================

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db_init():
    try:
        await db.command("ping")
        await db.users.create_index("email", unique=True)
    except Exception:
        logger.exception("MongoDB startup initialization failed")


# ================= SHUTDOWN =================

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# ================= STATIC =================

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


# ================= FRONTEND =================

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

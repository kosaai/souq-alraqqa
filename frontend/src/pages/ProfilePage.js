import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const API_BASE_URL = 'https://souq-alraqqa.onrender.com';
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: 'user@example.com',
    phone: '+963991234567',
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [tempAvatar, setTempAvatar] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data || {};
        setProfileData((prev) => ({
          ...prev,
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          avatar: data.image || null,
        }));
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileData({ ...profileData, avatar: null });
    setTempAvatar(null);
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setErrorMsg('');
    setFeedbackMsg('');

    try {
      await axios.put(
        `${API_BASE_URL}/api/user/update`,
        {
          full_name: profileData.full_name,
          email: profileData.email,
          phone: profileData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsEditing(false);
      setFeedbackMsg('تم تحديث المعلومات بنجاح');
    } catch (err) {
      const rawMessage = err?.response?.data?.detail || err?.response?.data?.message || '';
      const errorMap = {
        'Email already exists': 'البريد الإلكتروني مستخدم مسبقاً',
        'Wrong password': 'كلمة المرور غير صحيحة',
      };
      setErrorMsg(errorMap[rawMessage] || rawMessage || 'تعذر تحديث المعلومات');
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setErrorMsg('');
    setFeedbackMsg('');

    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/change-password`,
        {
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setShowPasswordSection(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setFeedbackMsg('تم تحديث المعلومات بنجاح');
    } catch (err) {
      const rawMessage = err?.response?.data?.detail || err?.response?.data?.message || '';
      const errorMap = {
        'Email already exists': 'البريد الإلكتروني مستخدم مسبقاً',
        'Wrong password': 'كلمة المرور غير صحيحة',
      };
      setErrorMsg(errorMap[rawMessage] || rawMessage || 'تعذر تحديث كلمة المرور');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 bg-[#F8FAFC] sticky top-0 z-40">
        <button
          onClick={() => navigate('/account')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          data-testid="back-btn"
        >
          <i className="fas fa-arrow-right text-[#1E293B]"></i>
        </button>
        <h1 className="text-xl font-bold text-[#1E293B] font-heading tracking-tight">
          الملف الشخصي
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 pt-6">
        {feedbackMsg && (
          <div className="mb-4 rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm font-bold">
            {feedbackMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm font-bold">
            {errorMsg}
          </div>
        )}

        {/* Profile Image Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">الصورة الشخصية</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              {profileData.avatar || tempAvatar ? (
                <img
                  src={profileData.avatar || tempAvatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white text-2xl">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-sm font-bold cursor-pointer hover:shadow-md transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="upload-image-input"
                />
                <i className="fas fa-upload ms-1"></i>
                {profileData.avatar ? 'تغيير' : 'رفع صورة'}
              </label>
              {profileData.avatar && (
                <button
                  onClick={handleDeleteImage}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all"
                  data-testid="delete-image-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#1E293B]">المعلومات الشخصية</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-[#4F46E5] font-bold"
                data-testid="edit-profile-btn"
              >
                تعديل
              </button>
            ) : (
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-sm font-bold"
                data-testid="save-profile-btn"
              >
                حفظ
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">
                <i className="fas fa-user ms-1"></i>
                الاسم
              </label>
              <input
                type="text"
                value={profileData.full_name}
                onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  isEditing
                    ? 'bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]'
                    : 'bg-slate-100 border-slate-100 text-slate-600'
                }`}
                data-testid="name-input"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">
                <i className="fas fa-envelope ms-1"></i>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  isEditing
                    ? 'bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]'
                    : 'bg-slate-100 border-slate-100 text-slate-600'
                }`}
                data-testid="email-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">
                <i className="fas fa-phone ms-1"></i>
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border transition-all ${
                  isEditing
                    ? 'bg-slate-50 border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]'
                    : 'bg-slate-100 border-slate-100 text-slate-600'
                }`}
                data-testid="phone-input"
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#1E293B]">كلمة المرور</h3>
            {!showPasswordSection ? (
              <button
                onClick={() => setShowPasswordSection(true)}
                className="text-sm text-[#4F46E5] font-bold"
                data-testid="change-password-btn"
              >
                تغيير
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowPasswordSection(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="text-sm text-slate-500 font-bold"
              >
                إلغاء
              </button>
            )}
          </div>

          {showPasswordSection && (
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-bold text-[#1E293B] mb-2">
                  كلمة المرور الحالية
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
                    data-testid="current-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-bold text-[#1E293B] mb-2">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
                  data-testid="new-password-input"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-[#1E293B] mb-2">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
                    data-testid="confirm-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <i
                      className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    ></i>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSavePassword}
                className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-md hover:shadow-lg transition-all"
                data-testid="save-password-btn"
              >
                حفظ كلمة المرور
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => navigate('/login')}
          className="w-full rounded-xl bg-red-50 text-red-600 font-bold py-3 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
          data-testid="logout-btn"
        >
          <i className="fas fa-right-from-bracket"></i>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

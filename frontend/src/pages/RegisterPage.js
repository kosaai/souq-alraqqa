import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const API_BASE_URL = 'https://souq-alraqqa.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      // ✅ إذا الباك يرجع توكن مباشرة
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      } else if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // ✅ انتقال بعد النجاح
      navigate('/');

    } catch (err) {
      console.error(err);
      const rawMessage = err?.response?.data?.detail || err?.response?.data?.message || '';
      const errorMap = {
        'Email already exists': 'البريد الإلكتروني مستخدم بالفعل',
        'Password and confirm password do not match': 'كلمة المرور غير متطابقة',
        'Database error': 'حدث خطأ في قاعدة البيانات',
      };
      const message = errorMap[rawMessage] || rawMessage || 'فشل إنشاء الحساب';
      setErrorMsg(message);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-[#F8FAFC] to-indigo-50/50 pb-20 pt-6"
    >
      <div className="w-full bg-white p-6 rounded-3xl shadow-sm">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#1E293B]">
            إنشاء حساب جديد
          </h2>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full mb-3 p-3 border rounded"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full mb-3 p-3 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="tel"
            placeholder="رقم الهاتف"
            className="w-full mb-3 p-3 border rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full mb-3 p-3 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="w-full mb-3 p-3 border rounded"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />

          {errors.confirmPassword && (
            <div className="text-red-500 text-sm mb-2">
              {errors.confirmPassword}
            </div>
          )}

          {errorMsg && (
            <div className="text-red-500 text-sm mb-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded"
          >
            {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
          </button>

        </form>

        <div className="mt-4 text-center">
          <button onClick={() => navigate('/login')}>
            تسجيل الدخول
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default RegisterPage;

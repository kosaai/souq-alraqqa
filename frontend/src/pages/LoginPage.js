import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE_URL = 'https://souq-alraqqa.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      // ✅ حفظ التوكن
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        console.log('[auth] token saved from access_token:', data.access_token);
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('[auth] token saved from token:', data.token);
      }

      // ✅ الانتقال للصفحة الرئيسية
      navigate('/');

    } catch (err) {
      console.error(err);
      const rawMessage = err?.response?.data?.detail || err?.response?.data?.message || '';
      const errorMap = {
        'User not found': 'المستخدم غير موجود',
        'Wrong password': 'كلمة المرور غير صحيحة',
        'Invalid token': 'بيانات الجلسة غير صالحة',
      };
      const message = errorMap[rawMessage] || rawMessage || 'فشل تسجيل الدخول';
      setError(message);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-[#F8FAFC] to-indigo-50/50 pb-20"
    >
      <div className="w-full bg-white p-6 rounded-3xl shadow-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
            <i className="fas fa-user text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B]">
            تسجيل الدخول
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            مرحباً بعودتك! سجل دخولك للمتابعة
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border"
              placeholder="ادخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>

          {/* ❌ رسالة خطأ */}
          {error && (
            <div className="mb-3 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3"
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => navigate('/register')}
            className="text-[#4F46E5] font-bold"
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;

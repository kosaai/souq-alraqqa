import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://souq-alraqqa.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'فشل تسجيل الدخول');
      }

      // ✅ حفظ التوكن
      localStorage.setItem('token', data.access_token);

      // ✅ الانتقال للصفحة الرئيسية
      navigate('/');

    } catch (err) {
      console.error(err);
      setError(err.message);
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
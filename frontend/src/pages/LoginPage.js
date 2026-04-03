import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - just navigate to home
    navigate('/');
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
          <h2 className="text-2xl font-bold text-[#1E293B] font-heading tracking-tight">
            تسجيل الدخول
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            مرحباً بعودتك! سجل دخولك للمتابعة
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-envelope ms-1"></i>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              data-testid="login-email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-lock ms-1"></i>
              كلمة المرور
            </label>
            <input
              type="password"
              data-testid="login-password-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>

          <button
            type="submit"
            data-testid="login-submit-btn"
            className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-md hover:shadow-lg transition-all"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-[#4F46E5] font-bold hover:underline"
            data-testid="forgot-password-link"
          >
            نسيت كلمة المرور؟
          </button>
          <div className="text-sm text-slate-500">
            ليس لديك حساب؟{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#4F46E5] font-bold hover:underline"
              data-testid="register-link"
            >
              إنشاء حساب جديد
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
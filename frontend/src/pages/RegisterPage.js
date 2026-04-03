import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock registration - navigate to home
    navigate('/');
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
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] font-heading tracking-tight">
            إنشاء حساب جديد
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            انضم إلينا وابدأ بنشر إعلاناتك
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-user ms-1"></i>
              الاسم الكامل
            </label>
            <input
              type="text"
              data-testid="register-name-input"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل اسمك الكامل"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-envelope ms-1"></i>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              data-testid="register-email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-phone ms-1"></i>
              رقم الهاتف
            </label>
            <input
              type="tel"
              data-testid="register-phone-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل رقم هاتفك"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-lock ms-1"></i>
              كلمة المرور
            </label>
            <input
              type="password"
              data-testid="register-password-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="ادخل كلمة المرور"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-[#1E293B] mb-2">
              <i className="fas fa-lock ms-1"></i>
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              data-testid="register-confirm-password-input"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
              placeholder="أعد إدخال كلمة المرور"
              required
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1" data-testid="password-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-testid="register-submit-btn"
            className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-md hover:shadow-lg transition-all"
          >
            إنشاء حساب
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="text-sm text-slate-500">
            لديك حساب بالفعل؟{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#4F46E5] font-bold hover:underline"
              data-testid="login-link"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
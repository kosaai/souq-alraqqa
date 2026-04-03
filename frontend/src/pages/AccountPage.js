import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: 'fa-user', label: 'الملف الشخصي', action: () => {} },
    { icon: 'fa-rectangle-list', label: 'إعلاناتي', action: () => {} },
    { icon: 'fa-gear', label: 'الإعدادات', action: () => {} },
    { icon: 'fa-circle-question', label: 'المساعدة والدعم', action: () => {} },
    { icon: 'fa-right-from-bracket', label: 'تسجيل الخروج', action: () => navigate('/login') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-4 bg-[#F8FAFC] sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-[#1E293B] font-heading tracking-tight">
          حسابي
        </h1>
      </div>

      {/* Profile Section */}
      <div className="px-4 pt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white text-2xl">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">مستخدم تجريبي</h2>
              <p className="text-sm text-slate-500">user@example.com</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              data-testid={`account-menu-${index}`}
              onClick={item.action}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
            >
              <i className={`fas ${item.icon} text-[#4F46E5] text-lg w-6`}></i>
              <span className="flex-1 text-right text-sm font-bold text-[#1E293B]">
                {item.label}
              </span>
              <i className="fas fa-chevron-left text-slate-400 text-xs"></i>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPage;
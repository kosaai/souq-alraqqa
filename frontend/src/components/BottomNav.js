import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: 'fa-house', path: '/' },
    { id: 'favorites', label: 'المفضلة', icon: 'fa-heart', path: '/favorites' },
    { id: 'add', label: '', icon: '', path: '/add-listing' }, // FAB placeholder
    { id: 'account', label: 'الحساب', icon: 'fa-user', path: '/account' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white h-16 rounded-t-3xl flex justify-around items-center px-6 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        if (item.id === 'add') {
          return (
            <motion.button
              key={item.id}
              data-testid="add-listing-fab"
              onClick={() => navigate(item.path)}
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white flex items-center justify-center text-2xl shadow-[0_8px_20px_rgba(79,70,229,0.3)] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <i className="fas fa-plus"></i>
            </motion.button>
          );
        }

        return (
          <button
            key={item.id}
            data-testid={`nav-${item.id}`}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer"
          >
            <i
              className={`fas ${item.icon} text-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent'
                  : 'text-slate-400'
              }`}
            ></i>
            <span
              className={`text-xs font-bold transition-colors ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent'
                  : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: 'fa-house', path: '/' },
    { id: 'favorites', label: 'المفضلة', icon: 'fa-heart', path: '/favorites' },
    { id: 'add', label: 'إضافة إعلان', icon: 'fa-plus', path: '/add-listing', isSpecial: true },
    { id: 'notifications', label: 'الإشعارات', icon: 'fa-bell', path: '/notifications' },
    { id: 'account', label: 'الحساب', icon: 'fa-user', path: '/account' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white h-20 rounded-t-3xl flex justify-around items-center px-2 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const active = isActive(item.path);
        
        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              data-testid={`nav-${item.id}`}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 min-w-[70px] cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white flex items-center justify-center shadow-lg">
                <i className={`fas ${item.icon} text-lg`}></i>
              </div>
              <span className="text-[10px] font-bold text-[#4F46E5]">
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            data-testid={`nav-${item.id}`}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1.5 min-w-[60px] cursor-pointer transition-all"
          >
            <i
              className={`fas ${item.icon} text-xl transition-colors ${
                active
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent'
                  : 'text-slate-400'
              }`}
            ></i>
            <span
              className={`text-[10px] font-bold transition-colors ${
                active
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
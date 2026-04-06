import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ NEW: حالة الصورة
  const [newImage, setNewImage] = useState(null);

  // ✅ جلب التوكن مرة وحدة
  const token = localStorage.getItem('token');

  // ✅ NEW: دالة رفع الصورة
  const handleImageUpload = async (selectedImage = newImage) => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const res = await fetch('https://souq-alraqqa.onrender.com/api/user/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      // تحديث المستخدم مباشرة
      setUser({ ...user, image: data.image_url });

      alert('تم تحديث الصورة');
    } catch (err) {
      console.error(err);
      alert('خطأ في رفع الصورة');
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    await handleImageUpload(file);
  };

  // ✅ حماية الصفحة + جلب البيانات
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetch('https://souq-alraqqa.onrender.com/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

  }, [navigate]);

  // ✅ تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const stats = [
    { key: 'total_ads', label: 'إجمالي الإعلانات', value: user?.total_ads ?? 0, icon: 'fa-rectangle-list' },
    { key: 'total_views', label: 'إجمالي المشاهدات', value: user?.total_views ?? 0, icon: 'fa-eye' },
    { key: 'favorites_count', label: 'المفضلة', value: user?.favorites_count ?? 0, icon: 'fa-heart' },
  ];

  const menuItems = [
    { icon: 'fa-rectangle-list', label: 'إعلاناتي', action: () => {} },
    { icon: 'fa-heart', label: 'المفضلة', action: () => navigate('/favorites') },
    { icon: 'fa-gear', label: 'الإعدادات', action: () => navigate('/profile') },
    { icon: 'fa-right-from-bracket', label: 'تسجيل الخروج', action: handleLogout, isLogout: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      <div className="px-4 pt-6 space-y-6">
        {/* Profile Header */}
        <div className="rounded-3xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="w-16 h-16 rounded-full overflow-hidden bg-white/20 border border-white/40 flex items-center justify-center shrink-0"
              aria-label="إضافة صورة"
            >
              {user?.image ? (
                <img src={user.image} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-user text-white text-2xl"></i>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-white truncate">
                {user?.full_name || '...'}
              </h1>
              <button
                type="button"
                onClick={handleAvatarClick}
                className="text-xs font-bold text-white/90 mt-1"
              >
                إضافة صورة
              </button>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="shrink-0 px-3 py-2 rounded-xl bg-white text-[#4F46E5] text-xs font-bold shadow-sm hover:shadow-md transition-all"
            >
              تعديل
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#1E293B]">المعلومات الشخصية</h3>
            <button
              onClick={() => navigate('/profile')}
              className="text-xs font-bold text-[#4F46E5]"
            >
              تعديل
            </button>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">الاسم</p>
            <p className="text-sm font-bold text-[#1E293B]">{user?.full_name || '...'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.key} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center mb-2">
                <i className={`fas ${stat.icon} text-[#4F46E5] text-sm`}></i>
              </div>
              <p className="text-lg font-extrabold text-[#1E293B]">{stat.value}</p>
              <p className="text-[11px] text-slate-500 leading-4">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`rounded-2xl p-4 shadow-sm border transition-all active:scale-[0.98] ${
                item.isLogout
                  ? 'bg-red-50 border-red-100 hover:bg-red-100'
                  : 'bg-white border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.isLogout ? 'bg-red-100' : 'bg-indigo-50'
                }`}>
                  <i className={`fas ${item.icon} text-base ${item.isLogout ? 'text-red-500' : 'text-[#4F46E5]'}`}></i>
                </div>
                <span className={`text-sm font-bold ${item.isLogout ? 'text-red-600' : 'text-[#1E293B]'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPage;

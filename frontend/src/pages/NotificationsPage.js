import React from 'react';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: 'إعلان جديد في عقارات',
      message: 'شقة فاخرة للبيع في دبي مارينا',
      time: 'منذ ساعتين',
      unread: true,
    },
    {
      id: 2,
      title: 'تم إضافة إعلانك بنجاح',
      message: 'تم نشر إعلانك وهو الآن مرئي للجميع',
      time: 'منذ 5 ساعات',
      unread: false,
    },
    {
      id: 3,
      title: 'عرض خاص لك',
      message: 'خصم 20% على الإعلانات المميزة',
      time: 'أمس',
      unread: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-center px-4 py-5 bg-[#F8FAFC] sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-[#1E293B] font-heading tracking-tight">
          الإشعارات
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        {notifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                data-testid={`notification-${notification.id}`}
                className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  notification.unread ? 'border-r-4 border-[#4F46E5]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white flex-shrink-0">
                    <i className="fas fa-bell text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#1E293B] mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-slate-400">{notification.time}</span>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#4F46E5] flex-shrink-0"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <i className="fas fa-bell-slash text-6xl text-slate-200 mb-4"></i>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">لا توجد إشعارات</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              سنعلمك عند وصول إشعارات جديدة
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
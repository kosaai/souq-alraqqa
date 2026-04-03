import React from 'react';
import { motion } from 'framer-motion';
import AdCard from '../components/AdCard';
import { mockAds } from '../data/mockData';

const FavoritesPage = () => {
  const favoriteAds = mockAds.filter((ad) => ad.isFavorite);

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
          المفضلة
        </h1>
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        {favoriteAds.length > 0 ? (
          <div className="flex flex-col gap-5">
            {favoriteAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <i className="fas fa-heart text-6xl text-slate-200 mb-4"></i>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">لا توجد مفضلات</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              لم تقم بإضافة أي إعلانات للمفضلة بعد
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FavoritesPage;
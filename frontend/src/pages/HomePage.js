import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';
import { mockAds, categories } from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4 bg-[#F8FAFC] sticky top-0 z-40">
        <i className="fas fa-bell text-xl text-[#1E293B] cursor-pointer" data-testid="notification-icon"></i>
        <h1 className="text-2xl font-bold font-heading tracking-tight text-[#1E293B]">
          السوق الإلكتروني
        </h1>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white cursor-pointer" data-testid="profile-icon">
          <i className="fas fa-user"></i>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mb-6 relative">
        <div className="bg-white rounded-full shadow-sm px-4 py-3 flex items-center gap-3">
          <i className="fas fa-magnifying-glass text-slate-400"></i>
          <input
            type="text"
            data-testid="search-input"
            placeholder="ابحث عن إعلان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-[#1E293B] placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1E293B] px-4 mb-4">التصنيفات</h2>
        <div className="grid grid-cols-3 gap-4 px-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Ads List */}
      <div className="mb-4">
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-xl font-bold text-[#1E293B]">آخر الإعلانات</h2>
          <button className="text-sm text-[#4F46E5] font-bold" data-testid="view-all-btn">
            عرض الكل
          </button>
        </div>
        <div className="flex flex-col gap-4 px-4 pb-4">
          {mockAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
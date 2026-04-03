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
      className="pb-24"
    >
      {/* Header */}
      <div className="flex justify-center items-center px-4 py-5 bg-[#F8FAFC] sticky top-0 z-40">
        <h1 className="text-2xl font-bold font-heading tracking-tight text-[#1E293B]">
          السوق الإلكتروني
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mx-4 mb-8 relative">
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
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1E293B] px-4 mb-5">التصنيفات</h2>
        <div className="grid grid-cols-3 gap-4 px-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Ads List */}
      <div className="mb-4">
        <div className="flex justify-between items-center px-4 mb-6">
          <h2 className="text-xl font-bold text-[#1E293B]">آخر الإعلانات</h2>
          <button 
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all" 
            data-testid="view-all-btn"
          >
            عرض الكل
          </button>
        </div>
        <div className="flex flex-col gap-5 px-4 pb-4">
          {mockAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
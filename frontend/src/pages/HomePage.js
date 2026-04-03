import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdCard from '../components/AdCard';
import CategoryCard from '../components/CategoryCard';
import { mockAds, categories } from '../data/mockData';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter ads based on search query and selected category
  const filteredAds = mockAds.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ad.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || ad.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

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
          سوق الرقة
        </h1>
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
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="text-slate-400 hover:text-slate-600"
              data-testid="clear-filters-btn"
            >
              <i className="fas fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badge */}
      {selectedCategory && (
        <div className="mx-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-sm font-bold shadow-sm">
            <span>التصنيف: {selectedCategory}</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="hover:bg-white/20 rounded-full p-0.5"
            >
              <i className="fas fa-xmark text-xs"></i>
            </button>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1E293B] px-4 mb-5">التصنيفات</h2>
        <div className="grid grid-cols-3 gap-4 px-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`transition-all ${
                selectedCategory === category.name ? 'ring-2 ring-[#4F46E5] rounded-2xl' : ''
              }`}
            >
              <CategoryCard
                category={category}
                onClick={() => handleCategoryClick(category.name)}
                isSelected={selectedCategory === category.name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center px-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              {selectedCategory || searchQuery ? 'نتائج البحث' : 'آخر الإعلانات'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {filteredAds.length} إعلان
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all"
            data-testid="view-all-btn"
          >
            عرض الكل
          </button>
        </div>

        {filteredAds.length > 0 ? (
          <div className="flex flex-col gap-5 px-4 pb-4">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <i className="fas fa-search text-6xl text-slate-200 mb-4"></i>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">لا توجد نتائج</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              جرب البحث بكلمات أخرى أو اختر تصنيف آخر
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
            >
              مسح البحث
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, onClick, isSelected }) => {
  return (
    <motion.div
      data-testid={`category-${category.id}`}
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-all ${
          isSelected
            ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white shadow-md'
            : 'bg-indigo-50 text-[#4F46E5] hover:shadow-md'
        }`}
      >
        <i className={`fas ${category.icon}`}></i>
      </div>
      <span
        className={`text-xs font-bold transition-colors ${
          isSelected
            ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent'
            : 'text-[#1E293B]'
        }`}
      >
        {category.name}
      </span>
    </motion.div>
  );
};

export default CategoryCard;
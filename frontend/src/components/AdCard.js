import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdCard = ({ ad }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(ad.isFavorite);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/ad/${ad.id}`);
  };

  return (
    <motion.div
      data-testid={`ad-card-${ad.id}`}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col relative cursor-pointer"
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full aspect-video object-cover"
        />
        <motion.button
          data-testid={`favorite-btn-${ad.id}`}
          onClick={toggleFavorite}
          className="absolute top-3 end-3 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <i
            className={`${
              isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart text-slate-500'
            } text-sm transition-colors`}
          ></i>
        </motion.button>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-[#1E293B] line-clamp-2 leading-relaxed mb-2">
          {ad.title}
        </h3>
        <p className="text-lg font-extrabold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
          {ad.price} ر.س
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
          <i className="fas fa-location-dot"></i>
          <span>{ad.location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AdCard;
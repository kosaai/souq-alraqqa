import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import AdCard from '../components/AdCard';
import { mockAds, mockUsers } from '../data/mockData';
import { formatPrice, formatTimeAgo, getUserById } from '../utils/helpers';

const AdDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = mockAds.find((a) => a.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(ad?.isFavorite || false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!ad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-500">لم يتم العثور على الإعلان</p>
      </div>
    );
  }

  const seller = getUserById(ad.userId, mockUsers);

  const similarAds = mockAds
    .filter((a) => a.category === ad.category && a.id !== ad.id)
    .slice(0, 3);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `${ad.title} - ${ad.price} ر.س`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
          setShowShareModal(false);
        }, 1500);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-[#F8FAFC] sticky top-0 z-40">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          data-testid="back-btn"
        >
          <i className="fas fa-arrow-right text-[#1E293B]"></i>
        </button>
        <h1 className="text-lg font-bold text-[#1E293B] font-heading tracking-tight">
          تفاصيل الإعلان
        </h1>
        <button
          onClick={() => setShowShareModal(true)}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          data-testid="share-btn"
        >
          <i className="fas fa-share-nodes text-[#4F46E5]"></i>
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full aspect-video object-cover"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
          data-testid="favorite-btn"
        >
          <i
            className={`${
              isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart text-slate-500'
            } text-lg transition-colors`}
          ></i>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        {/* Category Badge & Status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold">
            {ad.category}
          </span>
          {ad.status && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${
              ad.status === 'جديد' ? 'bg-green-50 text-green-600' :
              ad.status === 'مستعمل' ? 'bg-orange-50 text-orange-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {ad.status}
            </span>
          )}
        </div>

        {/* Rating & Views */}
        <div className="flex items-center gap-4 mb-3">
          {ad.rating && (
            <div className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400"></i>
              <span className="text-sm font-bold text-[#1E293B]">{ad.rating}</span>
            </div>
          )}
          {ad.viewCount && (
            <div className="flex items-center gap-1">
              <i className="fas fa-eye text-slate-400"></i>
              <span className="text-sm text-slate-500">{ad.viewCount} مشاهدة</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1E293B] leading-relaxed mb-3">
          {ad.title}
        </h2>

        {/* Price */}
        <p className="text-3xl font-extrabold bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent mb-4">
          {formatPrice(ad.price)} ر.س
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-600 mb-6">
          <i className="fas fa-location-dot text-[#4F46E5]"></i>
          <span className="text-sm">{ad.location}</span>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-3">الوصف</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {ad.description}
          </p>
        </div>

        {/* Seller Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">معلومات البائع</h3>
          <div className="flex items-center gap-4 mb-4">
            {seller && (
              <>
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">{seller.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <span className="text-xs text-slate-500">{seller.rating}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${ad.phone}`}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              data-testid="call-seller-btn"
            >
              <i className="fas fa-phone"></i>
              <span>اتصل</span>
            </a>
            <a
              href={`https://wa.me/${ad.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-green-500 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              data-testid="whatsapp-btn"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              <span>واتساب</span>
            </a>
          </div>
        </div>

        {/* Similar Ads */}
        {similarAds.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-4">إعلانات مشابهة</h3>
            <div className="flex flex-col gap-4 mb-4">
              {similarAds.map((similarAd) => (
                <AdCard key={similarAd.id} ad={similarAd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white rounded-t-3xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
              data-testid="share-modal"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-[#1E293B] text-center mb-6">
                مشاركة الإعلان
              </h3>

              {copySuccess ? (
                <div className="text-center py-8">
                  <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                  <p className="text-lg font-bold text-[#1E293B]">تم نسخ الرابط!</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex flex-col items-center gap-2"
                    data-testid="share-whatsapp"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <span className="text-xs text-slate-600">WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex flex-col items-center gap-2"
                    data-testid="share-facebook"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                      <i className="fab fa-facebook-f"></i>
                    </div>
                    <span className="text-xs text-slate-600">Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex flex-col items-center gap-2"
                    data-testid="share-twitter"
                  >
                    <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center text-white text-xl">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <span className="text-xs text-slate-600">Twitter</span>
                  </button>

                  <button
                    onClick={() => handleShare('copy')}
                    className="flex flex-col items-center gap-2"
                    data-testid="share-copy"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-500 flex items-center justify-center text-white text-xl">
                      <i className="fas fa-link"></i>
                    </div>
                    <span className="text-xs text-slate-600">نسخ الرابط</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full rounded-xl bg-slate-100 text-slate-600 font-bold py-3 hover:bg-slate-200 transition-colors"
              >
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdDetailsPage;

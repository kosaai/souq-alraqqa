import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';

const AddListingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    phone: '',
    sellerName: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 pb-28 pt-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          data-testid="back-btn"
        >
          <i className="fas fa-arrow-right text-[#1E293B]"></i>
        </button>
        <h1 className="text-2xl font-bold text-[#1E293B] font-heading tracking-tight">
          إضافة إعلان جديد
        </h1>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2 mb-6 cursor-pointer hover:border-[#818CF8] transition-colors" data-testid="image-upload-area">
          <i className="fas fa-cloud-arrow-up text-4xl"></i>
          <p className="text-sm font-bold">اضغط لرفع الصور</p>
          <p className="text-xs">يمكنك رفع عدة صور</p>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            عنوان الإعلان
          </label>
          <input
            type="text"
            data-testid="listing-title-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            placeholder="مثال: شقة فاخرة للبيع"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            الوصف
          </label>
          <textarea
            data-testid="listing-description-input"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all min-h-[100px] resize-none"
            placeholder="اكتب وصفاً تفصيلياً للإعلان"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            السعر (ر.س)
          </label>
          <input
            type="text"
            data-testid="listing-price-input"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            placeholder="0"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            التصنيف
          </label>
          <select
            data-testid="listing-category-select"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            required
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            <i className="fas fa-location-dot ms-1"></i>
            الموقع
          </label>
          <input
            type="text"
            data-testid="listing-location-input"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            placeholder="المدينة، الدولة"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            <i className="fas fa-phone ms-1"></i>
            رقم الهاتف
          </label>
          <input
            type="tel"
            data-testid="listing-phone-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            placeholder="05xxxxxxxx"
            required
          />
        </div>

        {/* Seller Name (Optional) */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1E293B] mb-2">
            اسم البائع (اختياري)
          </label>
          <input
            type="text"
            data-testid="listing-seller-input"
            value={formData.sellerName}
            onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[#818CF8] transition-all"
            placeholder="اسمك أو اسم الشركة"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="listing-submit-btn"
          className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-md hover:shadow-lg transition-all"
        >
          نشر الإعلان
        </button>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          data-testid="success-message"
        >
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] flex items-center justify-center">
              <i className="fas fa-check text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">تم بنجاح!</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              تم نشر إعلانك بنجاح
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddListingPage;
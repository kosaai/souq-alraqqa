import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const API_BASE_URL = 'https://souq-alraqqa.onrender.com';
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    avatar: null,
  });

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const mapBackendError = (rawMessage, fallback) => {
    const errorMap = {
      'Email already exists': 'البريد الإلكتروني مستخدم مسبقاً',
      'Wrong password': 'كلمة المرور غير صحيحة',
      'User not found': 'المستخدم غير موجود',
    };

    return errorMap[rawMessage] || rawMessage || fallback;
  };

  const getTokenOrRedirect = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return null;
    }
    return token;
  };

  const loadMe = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    const meUrl = `${API_BASE_URL}/api/me`;
    const meHeaders = { Authorization: `Bearer ${token}` };
    console.log('[profile] /api/me request:', { url: meUrl, headers: meHeaders, token });

    try {
      const res = await axios.get(meUrl, { headers: meHeaders });
      console.log('[profile] /api/me response:', res.status, res.data);
      const user = res.data || {};

      const nextData = {
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || user.image || null,
      };

      setProfileData(nextData);
      setFormData((prev) => ({ ...prev, ...nextData, password: '' }));
    } catch (err) {
      const status = err?.response?.status;
      const raw = err?.response?.data?.detail || err?.response?.data?.message || err.message;
      console.error('[profile] /api/me error:', status, err?.response?.data || err.message);

      if (status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      setErrorMsg(mapBackendError(raw, 'تعذر تحميل بيانات الحساب'));
    }
  };

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = getTokenOrRedirect();
    if (!token) return;

    setErrorMsg('');
    setFeedbackMsg('');

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/upload-image`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const avatarUrl = res?.data?.avatar || res?.data?.image_url || null;
      setProfileData((prev) => ({ ...prev, avatar: avatarUrl }));
      setFormData((prev) => ({ ...prev, avatar: avatarUrl }));
      setFeedbackMsg('تم تحديث الصورة بنجاح');
    } catch (err) {
      const status = err?.response?.status;
      const raw = err?.response?.data?.detail || err?.response?.data?.message || err.message;
      console.error('[profile] /api/user/upload-image error:', status, err?.response?.data || err.message);

      if (status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      setErrorMsg(mapBackendError(raw, 'تعذر تحديث الصورة'));
    } finally {
      e.target.value = '';
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    const token = getTokenOrRedirect();
    if (!token) return;

    setLoading(true);
    setErrorMsg('');
    setFeedbackMsg('');

    try {
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
      };

      if (formData.password?.trim()) {
        payload.password = formData.password;
      }

      const res = await axios.put(`${API_BASE_URL}/api/user/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = res.data || {};
      const merged = {
        full_name: updated.full_name || payload.full_name,
        email: updated.email || payload.email,
        phone: updated.phone || payload.phone,
        avatar: profileData.avatar,
      };

      setProfileData(merged);
      setFormData((prev) => ({ ...merged, password: '' }));
      setIsEditing(false);
      setFeedbackMsg('تم تحديث المعلومات بنجاح');
    } catch (err) {
      const status = err?.response?.status;
      const raw = err?.response?.data?.detail || err?.response?.data?.message || err.message;
      console.error('[profile] /api/user/update error:', status, err?.response?.data || err.message);

      if (status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      setErrorMsg(mapBackendError(raw, 'تعذر تحديث المعلومات'));
    } finally {
      setLoading(false);
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
      <div className="flex items-center justify-between px-4 py-5 bg-[#F8FAFC] sticky top-0 z-40">
        <button
          onClick={() => navigate('/account')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
          data-testid="back-btn"
        >
          <i className="fas fa-arrow-right text-[#1E293B]"></i>
        </button>
        <h1 className="text-xl font-bold text-[#1E293B] font-heading tracking-tight">
          الملف الشخصي
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {feedbackMsg && (
          <div className="rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm font-bold">
            {feedbackMsg}
          </div>
        )}
        {errorMsg && (
          <div className="rounded-xl bg-red-50 text-red-600 px-4 py-3 text-sm font-bold">
            {errorMsg}
          </div>
        )}

        {/* Modern Profile Header */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] rounded-3xl p-6 shadow-sm text-center">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-white/40 shadow-md bg-white/20 flex items-center justify-center"
          >
            {profileData.avatar ? (
              <img src={profileData.avatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <i className="fas fa-user text-white text-3xl"></i>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />

          <h2 className="mt-4 text-xl font-bold text-white">
            {profileData.full_name || '...'}
          </h2>
          <p className="text-sm text-white/85 mt-1">{profileData.email || '...'}</p>

          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="mt-4 px-5 py-2 rounded-full bg-white text-[#4F46E5] text-sm font-bold shadow-sm"
          >
            {isEditing ? 'إلغاء التعديل' : 'تعديل المعلومات'}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSubmitProfile} className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">الاسم</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">كلمة المرور (اختياري)</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#818CF8]"
                placeholder="اتركها فارغة إذا لا تريد التغيير"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold py-3 shadow-sm"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;

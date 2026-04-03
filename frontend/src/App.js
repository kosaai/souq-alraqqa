import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AddListingPage from '@/pages/AddListingPage';
import FavoritesPage from '@/pages/FavoritesPage';
import NotificationsPage from '@/pages/NotificationsPage';
import AccountPage from '@/pages/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (without bottom nav) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Main App Routes (with bottom nav) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
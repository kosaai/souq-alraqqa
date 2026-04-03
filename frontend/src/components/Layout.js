import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export const Layout = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-[#F8FAFC] shadow-2xl overflow-x-hidden">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default Layout;
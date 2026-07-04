import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] dark:bg-[#0B0F19] transition-colors duration-200">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 lg:pl-64 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0B0F19] border-b border-slate-800 flex items-center justify-between px-6 z-50 transition-colors duration-200 dark:border-slate-800 light-mode:border-slate-200">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          CodeReview AI
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
        {user && (
          <div className="flex items-center gap-3 border-l border-slate-800 pl-4 light-mode:border-slate-200">
            <span className="text-sm text-slate-300 font-medium">{user.username}</span>
            <button onClick={logout} className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/30 transition" title="Sign Out">
              <FiLogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
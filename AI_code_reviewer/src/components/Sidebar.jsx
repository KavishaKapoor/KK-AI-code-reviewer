import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiClock, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const links = [
    { to: '/', name: 'Dashboard', icon: <FiGrid /> },
    { to: '/history', name: 'Audit Reports', icon: <FiClock /> },
    { to: '/profile', name: 'Profile Config', icon: <FiUser /> },
  ];

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-[#0B0F19] border-r border-slate-800 hidden lg:flex flex-col p-4 z-40 transition-colors duration-200 dark:border-slate-800 light-mode:border-slate-200">
      <div className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
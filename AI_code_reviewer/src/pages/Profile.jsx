import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiShield } from 'react-icons/fi';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto bg-[#131A26] border border-slate-800 rounded-2xl p-6 space-y-6 light-mode:bg-white light-mode:border-slate-200">
      <h2 className="text-xl font-bold text-white light-mode:text-slate-900">User Settings Node</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-[#0B0F19] rounded-xl border border-slate-800 light-mode:bg-slate-50 light-mode:border-slate-200">
          <FiUser className="text-indigo-400" size={20} />
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Username Handle</div>
            <div className="text-sm font-semibold text-slate-200 light-mode:text-slate-800">{user?.username || 'Guest Matrix'}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-[#0B0F19] rounded-xl border border-slate-800 light-mode:bg-slate-50 light-mode:border-slate-200">
          <FiMail className="text-indigo-400" size={20} />
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Parameter</div>
            <div className="text-sm font-semibold text-slate-200 light-mode:text-slate-800">{user?.email || 'unconfigured@system.local'}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-[#0B0F19] rounded-xl border border-slate-800 light-mode:bg-slate-50 light-mode:border-slate-200">
          <FiShield className="text-emerald-400" size={20} />
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">System Role Strategy</div>
            <div className="text-sm font-semibold text-emerald-400">Authenticated Terminal User</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
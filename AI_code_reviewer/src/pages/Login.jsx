import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      toast.success("Identity session authorized.");
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <div className="w-full max-w-md bg-[#131A26] border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Access Control Workspace</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Email Address</label>
            <input type="email" required className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Security Access Key</label>
            <input type="password" required className="w-full bg-[#0B0F19] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold tracking-wide transition shadow-lg shadow-indigo-600/20">
            Initialize Session
          </button>
        </form>
        <p className="text-center text-xs text-slate-500 mt-6">
          New terminal user? <Link to="/register" className="text-indigo-400 hover:underline">Provision account profiles</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
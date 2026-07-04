import React, { useState } from 'react';
import { storageService } from '../services/storageService.js';
import { FiTrash2, FiClock } from 'react-icons/fi';
import { toast } from 'react-toastify';

const History = () => {
  const [items, setItems] = useState(() => storageService.getHistory());

  const dropItem = (id) => {
    const updated = storageService.deleteReport(id);
    setItems(updated);
    toast.info("Target record deleted.");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white light-mode:text-slate-900">Historical Metrics Log</h2>
      {items.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl">
          <FiClock size={36} className="text-slate-600 mb-2 mx-auto" />
          <p className="text-sm text-slate-400">Log history clear.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-[#131A26] p-4 rounded-xl border border-slate-800 flex justify-between items-center light-mode:bg-white light-mode:border-slate-200 shadow-sm">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white light-mode:text-slate-900 capitalize">{item.language}</span>
                  <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md uppercase tracking-wider">{item.reviewType}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-1">{item.summary}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-extrabold text-indigo-400">{item.globalScore}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SCORE</div>
                </div>
                <button onClick={() => dropItem(item.id)} className="p-2 bg-rose-950/20 text-rose-400 hover:bg-rose-900/40 rounded-lg transition" title="Purge Record">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
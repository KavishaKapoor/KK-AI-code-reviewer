import React from 'react';

const MetricCard = ({ label, value }) => {
  const getBarColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-[#131A26] p-4 rounded-lg border border-slate-800 flex flex-col justify-between shadow-sm light-mode:bg-white light-mode:border-slate-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{label}</span>
        <span className="text-sm font-bold text-slate-200 light-mode:text-slate-800">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${getBarColor(value)} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default MetricCard;
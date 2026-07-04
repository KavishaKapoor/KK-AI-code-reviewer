import React from 'react';

const ScoreWheel = ({ score }) => {
  const getColor = (s) => {
    if (s >= 80) return 'stroke-emerald-500';
    if (s >= 50) return 'stroke-amber-500';
    return 'stroke-rose-500';
  };

  return (
    <div className="bg-[#131A26] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative min-w-[200px] shadow-lg light-mode:bg-white light-mode:border-slate-200">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" className="stroke-slate-800 fill-none" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="40" 
            className={`fill-none transition-all duration-1000 ease-out ${getColor(score)}`} 
            strokeWidth="8" 
            strokeDasharray="251.2" 
            strokeDashoffset={251.2 - (251.2 * score) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white light-mode:text-slate-900">{score}</span>
          <span className="text-xs text-slate-400 font-semibold tracking-wider">PERCENT</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-slate-200 light-mode:text-slate-800">Health Audit</h3>
        <p className="text-xs text-slate-400 mt-1">Optimized for production pipeline</p>
      </div>
    </div>
  );
};

export default ScoreWheel;
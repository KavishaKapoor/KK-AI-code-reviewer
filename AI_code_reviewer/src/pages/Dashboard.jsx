import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import ScoreWheel from '../components/ScoreWheel';
import MetricCard from '../components/MetricCard';
import VulnerabilityList from '../components/VulnerabilityList';
import { languageTemplates } from '../utils/languageTemplates';
import { analyzeCodeBlock } from '../services/aiService';
import { storageService } from '../services/storageService';
import { toast } from 'react-toastify';
import { FiCpu, FiPlay, FiCopy } from 'react-icons/fi';

const Dashboard = () => {
  const [lang, setLang] = useState('javascript');
  const [type, setType] = useState('Security Review');
  const [code, setCode] = useState(languageTemplates.javascript);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    setCode(languageTemplates[lang] || '// Type code block here...');
  }, [lang]);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      // No longer passing a manual key string, handled entirely in the background file
      const parsedData = await analyzeCodeBlock(code, lang, type);
      const productionSavedNode = storageService.saveReport({ ...parsedData, language: lang, reviewType: type });
      setReport(productionSavedNode);
      toast.success("Analysis report complete.");
    } catch (err) {
      toast.error(`Execution fault: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Refactored Clean Header Strip Matching image_8448a2.png perfectly */}
      <div className="bg-[#131A26] p-4 rounded-xl border border-slate-800 flex flex-wrap gap-4 justify-between items-center light-mode:bg-white light-mode:border-slate-200">
        <div className="flex flex-wrap gap-3 items-center">
          <select className="bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 light-mode:bg-slate-100 light-mode:text-slate-800 focus:outline-none" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
          </select>
          <select className="bg-[#0B0F19] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 light-mode:bg-slate-100 light-mode:text-slate-800 focus:outline-none" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Bug Detection">Bug Detection</option>
            <option value="Security Review">Security Review</option>
            <option value="Performance Optimization">Performance Optimization</option>
          </select>
        </div>
        
        {/* Hidden field completely replaced by single action control */}
        <div className="flex gap-2 items-center">
          <button onClick={runAnalysis} disabled={loading} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold tracking-wide flex items-center gap-2 transition disabled:opacity-50 shadow-md">
            {loading ? <FiCpu className="animate-spin" /> : <FiPlay />} Analyze Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">Input Terminal Buffer</h3>
          <CodeEditor code={code} onChange={(val) => setCode(val)} language={lang} />
        </div>

        <div className="space-y-6">
          {report ? (
            <>
              <div className="flex flex-col md:flex-row gap-6">
                <ScoreWheel score={report.globalScore} />
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {Object.entries(report.metrics).map(([key, value]) => (
                    <MetricCard key={key} label={key} value={value} />
                  ))}
                </div>
              </div>

              <div className="bg-[#131A26] p-5 rounded-xl border border-slate-800 space-y-4 light-mode:bg-white light-mode:border-slate-200">
                <h4 className="text-xs font-bold tracking-wider text-indigo-400 uppercase">AI Assessment Summary</h4>
                <p className="text-sm text-slate-300 light-mode:text-slate-700 leading-relaxed">{report.summary}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3">Vulnerabilities & Alerts</h3>
                <VulnerabilityList vulnerabilities={report.vulnerabilities} />
              </div>

              <div className="bg-[#131A26] border border-slate-800 rounded-xl overflow-hidden light-mode:bg-white light-mode:border-slate-200">
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center light-mode:bg-slate-100">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Refactored System Path</span>
                  <button onClick={() => { navigator.clipboard.writeText(report.refactoredSolution); toast.info("Solution script bound to system clipboard."); }} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition">
                    <FiCopy /> Copy Solution
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono bg-[#0B0F19] text-emerald-400 max-h-60">
                  <code>{report.refactoredSolution}</code>
                </pre>
                {report.proTip && (
                  <div className="p-4 bg-indigo-950/20 border-t border-slate-800 text-xs text-indigo-300">
                    <strong>PRO TIP:</strong> {report.proTip}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-800 rounded-xl">
              <FiCpu size={48} className="text-slate-700 mb-3 animate-pulse" />
              <p className="text-sm text-slate-400 font-medium">No system metrics deployed.</p>
              <p className="text-xs text-slate-600 mt-1">Provide your code configuration block above and execute static analysis pipelines.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
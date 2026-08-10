import React from 'react';
import { CheckCircle2, Sun, Activity, Zap, AlertTriangle } from 'lucide-react';

export const StatsOverview = ({ analysisData, stcSpecs }) => {
  if (!analysisData || analysisData.length === 0) return null;

  const total = analysisData.length;
  const passed = analysisData.filter(m => m.overall_pass).length;
  const failed = total - passed;
  const passRate = parseFloat(((passed / total) * 100).toFixed(1));

  const avgIrr = (analysisData.reduce((acc, m) => acc + m.irr, 0) / total).toFixed(0);
  const avgTemp = (analysisData.reduce((acc, m) => acc + m.temp, 0) / total).toFixed(1);
  const avgIscDev = (analysisData.reduce((acc, m) => acc + m.isc_dev, 0) / total).toFixed(2);
  const avgVocDev = (analysisData.reduce((acc, m) => acc + m.voc_dev, 0) / total).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full mx-auto">
      
      {/* Total Modules Bento Card */}
      <div className="bento-card-spacious p-7 relative overflow-hidden group text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Total Modules
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Batch Logged
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-3 my-2 text-center">
          <span className="text-4xl font-extrabold font-syne text-white tracking-tight">{total}</span>
          <span className="text-sm font-mono text-slate-400">Modules</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 h-2 rounded-full mt-6 overflow-hidden">
          <div className="bg-cyan-400 h-full rounded-full transition-all duration-500 mx-auto" style={{ width: `${passRate}%` }}></div>
        </div>
        <div className="text-xs font-mono text-emerald-400 mt-3 flex items-center justify-between w-full">
          <span>IEC Compliance</span>
          <span className="font-bold">{passRate}%</span>
        </div>
      </div>

      {/* Compliance Status Bento Card */}
      <div className="bento-card-spacious p-7 relative overflow-hidden group text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Compliance Status
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            ±{stcSpecs.tolerance}% Tol.
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-4 my-2 text-center">
          <span className="text-4xl font-extrabold font-syne text-emerald-400 tracking-tight">{passed}</span>
          <span className="text-sm font-mono text-slate-400">Passed</span>
          <span className="text-xl font-bold font-syne text-rose-400">{failed} <span className="text-xs font-mono text-slate-400 font-normal">Failed</span></span>
        </div>

        <div className="w-full bg-slate-800/80 h-2 rounded-full mt-6 overflow-hidden flex">
          <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${passRate}%` }}></div>
          <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${100 - passRate}%` }}></div>
        </div>
        <div className="text-xs font-mono text-slate-400 mt-3 flex items-center justify-between w-full">
          <span className="text-emerald-400 font-bold">{passed} PASS</span>
          <span className="text-rose-400 font-bold">{failed} FAIL</span>
        </div>
      </div>

      {/* Field Conditions Bento Card */}
      <div className="bento-card-spacious p-7 relative overflow-hidden group text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" /> Avg Field Irradiance
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            STC 1000
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-3 my-2 text-center">
          <span className="text-4xl font-extrabold font-syne text-white tracking-tight">{avgIrr}</span>
          <span className="text-sm font-mono text-amber-400">W/m²</span>
        </div>

        <div className="w-full bg-slate-800/80 h-2 rounded-full mt-6 overflow-hidden">
          <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (avgIrr / 1000) * 100)}%` }}></div>
        </div>
        <div className="text-xs font-mono text-slate-400 mt-3 flex items-center justify-between w-full">
          <span>Module Temp</span>
          <span className="text-amber-300 font-bold">{avgTemp} °C</span>
        </div>
      </div>

      {/* STC Deviations Bento Card */}
      <div className="bento-card-spacious p-7 relative overflow-hidden group text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-4 w-full">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" /> Mean STC Deviations
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-4 my-2 text-center">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Isc Dev</div>
            <div className={`text-2xl font-bold font-syne ${Number(avgIscDev) <= stcSpecs.tolerance ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Number(avgIscDev) > 0 ? '+' : ''}{avgIscDev}%
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Voc Dev</div>
            <div className={`text-2xl font-bold font-syne ${Number(avgVocDev) <= stcSpecs.tolerance ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Number(avgVocDev) > 0 ? '+' : ''}{avgVocDev}%
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800/80 h-2 rounded-full mt-6 overflow-hidden">
          <div className="bg-violet-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.abs(Number(avgIscDev)) * 5)}%` }}></div>
        </div>
        <div className="text-xs font-mono text-slate-400 mt-3 flex items-center justify-center gap-1 w-full">
          <span className="text-violet-300 font-bold">IEC 60891 Corrected</span>
        </div>
      </div>

    </div>
  );
};

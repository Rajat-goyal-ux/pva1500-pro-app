import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = ({ onOpenLegal }) => {
  return (
    <footer className="mt-auto border-t border-glass-border bg-[#08101c]/80 backdrop-blur-md py-6 px-4 text-center font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300 font-bold font-syne">PVA-1500 Pro Platform</span>
          <span className="text-[10px] bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded border border-slate-700">v2.5.0-pro</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button onClick={() => onOpenLegal('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => onOpenLegal('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button>
          <span>•</span>
          <button onClick={() => onOpenLegal('copyright')} className="hover:text-cyan-400 transition-colors">Copyright</button>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          Built for Solar Professionals <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </footer>
  );
};

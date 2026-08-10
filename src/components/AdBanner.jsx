import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { DollarSign } from 'lucide-react';

export const AdBanner = ({ slot = "1111111111", format = "auto" }) => {
  const { isPro } = useAuth();
  const adRef = useRef(null);

  if (isPro) return null;

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current && adRef.current.children.length === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log('AdSense Push Notice:', e.message);
    }
  }, []);

  return (
    <div className="my-6 w-full max-w-[728px] mx-auto text-center flex flex-col items-center justify-center z-10">
      <div className="bg-slate-950/70 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl relative overflow-hidden text-center w-full shadow-lg shadow-cyan-500/10">
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1 text-center">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Sponsored Ad Banner (Google AdSense)
        </div>

        {/* AdSense Isolated Node */}
        <div ref={adRef} suppressHydrationWarning>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          ></ins>
        </div>

        {/* Fallback Display for Dev Preview */}
        <div className="py-4 px-6 bg-gradient-to-r from-slate-900/60 via-cyan-950/30 to-slate-900/60 rounded-xl border border-dashed border-cyan-500/40 flex flex-col sm:flex-row items-center justify-center text-center gap-3 mt-2">
          <div className="text-center sm:text-left">
            <div className="text-xs font-bold text-cyan-300 font-syne">Solar EPC Tooling Sponsor</div>
            <div className="text-[11px] text-slate-400 font-mono">Calibrate your PVA-1500 probes with zero downtime</div>
          </div>
          <div className="sm:ml-auto">
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
              AdSense Slot Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

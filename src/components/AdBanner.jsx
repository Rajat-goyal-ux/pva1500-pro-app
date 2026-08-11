'use client';

import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { DollarSign, ExternalLink, Zap } from 'lucide-react';

export const AdBanner = ({ scriptUrl, adKey, slot = "1111111111", format = "auto" }) => {
  const { isPro } = useAuth();
  const adRef = useRef(null);

  if (isPro) return null;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (scriptUrl && adRef.current) {
      try {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        if (adKey) script.dataset.adKey = adKey;
        adRef.current.appendChild(script);
      } catch (err) {
        console.log('Dynamic Ad Notice:', err);
      }
    } else {
      try {
        if (window.adsbygoogle && adRef.current && adRef.current.querySelectorAll('ins.adsbygoogle').length > 0) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.log('AdSense Push Notice:', e.message);
      }
    }
  }, [scriptUrl, adKey]);

  return (
    <div className="my-3 w-full max-w-[640px] mx-auto text-center flex flex-col items-center justify-center z-10">
      <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-2.5 backdrop-blur-xl relative overflow-hidden text-center w-full shadow-md shadow-cyan-500/10">
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1 text-center">
          <DollarSign className="w-3 h-3 text-emerald-400" /> Sponsored High-CPM Ad Network
        </div>

        {/* Compact Ad Container */}
        <div ref={adRef} suppressHydrationWarning className="w-full flex items-center justify-center min-h-[60px]">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '60px', width: '100%' }}
            data-ad-client="ca-pub-2090516545725907"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          ></ins>
        </div>

        {/* Sleek Compact Sponsor Bar */}
        <a
          href="https://www.google.com/search?q=solar+pv+testing+equipment+calibrator"
          target="_blank"
          rel="noopener noreferrer"
          className="group py-2 px-3.5 bg-gradient-to-r from-slate-900/80 via-cyan-950/40 to-slate-900/80 hover:from-cyan-950/60 hover:to-slate-900/90 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 mt-2 block"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 group-hover:scale-105 transition-transform">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white group-hover:text-cyan-300 font-syne flex items-center gap-1 justify-center sm:justify-start">
                <span>Solar PV High-Voltage Calibration Probes</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-400" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Calibrate Solmetric PVA-1500 probes with IEC 60891</div>
            </div>
          </div>
          <div>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold tracking-wide">
              Sponsored
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

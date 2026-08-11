'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Play, CheckCircle2, Download, DollarSign, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const AdRewardedModal = ({ isOpen, onClose, onConfirmDownload, reportType = 'PDF', adsenseApproved = false }) => {
  const { isPro } = useAuth();
  const [timer, setTimer] = useState(5);
  const [adWatched, setAdWatched] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isOpen && adsenseApproved && !isPro && !adWatched) {
      setTimer(5);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setAdWatched(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, adsenseApproved, isPro, adWatched]);

  if (!isOpen) return null;

  const handleDownload = () => {
    onConfirmDownload();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-lg w-full p-6 relative border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 mb-3 animate-pulse">
            <Zap className="w-7 h-7 fill-current" />
          </div>
          <h3 className="text-xl font-bold font-syne text-white">
            {reportType === 'PDF' ? '📄 Certified PDF Report Generator' : '📊 Excel XLSX Data Sheet'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {adsenseApproved ? 'Watch sponsored ad impression to unlock report' : 'AdSense Pending Mode • 100% Free Unlimited Access Active'}
          </p>
        </div>

        {/* Pre-AdSense Approval Mode: Instant 100% Free Download */}
        {!adsenseApproved ? (
          <div className="space-y-4 my-4 font-mono text-xs">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-center">
              <div className="font-bold flex items-center justify-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Pre-Approval Special Access Active!
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                AdSense verification is currently in progress. Enjoy unlimited free report downloads without any ad waits!
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="btn-animated-cyber w-full justify-center bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-extrabold py-3 text-xs shadow-lg shadow-emerald-500/30"
            >
              <Download className="w-4 h-4 fill-current" />
              <span>Download {reportType} Report Now (100% Free)</span>
            </button>
          </div>
        ) : (
          /* Post-AdSense Approval Mode: Ad-Rewarded Report Generation */
          <div className="space-y-4 my-4 font-mono text-xs">
            {/* Sponsored Ad Container */}
            <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-4 text-center relative overflow-hidden min-h-[140px] flex flex-col items-center justify-center">
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Sponsored Ad Impression
              </div>

              {/* Live Ad Container */}
              <div className="w-full flex items-center justify-center py-2">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', minHeight: '90px', width: '100%' }}
                  data-ad-client="ca-pub-2090516545725907"
                  data-ad-slot="3333333333"
                  data-ad-format="auto"
                ></ins>
              </div>

              {!adWatched ? (
                <div className="text-amber-400 text-[11px] font-bold flex items-center justify-center gap-2 mt-2 bg-amber-500/10 py-1.5 px-3 rounded-full border border-amber-500/30">
                  <Play className="w-3.5 h-3.5 animate-spin" />
                  Watching Ad to Unlock Report... ({timer}s)
                </div>
              ) : (
                <div className="text-emerald-400 text-[11px] font-bold flex items-center justify-center gap-2 mt-2 bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ad Verified! Report Download Unlocked
                </div>
              )}
            </div>

            {/* CTA Button */}
            {adWatched || isPro ? (
              <button
                onClick={handleDownload}
                className="btn-animated-cyber w-full justify-center bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 text-slate-950 font-extrabold py-3 text-xs shadow-lg shadow-cyan-500/30"
              >
                <Download className="w-4 h-4 fill-current" />
                <span>Download {reportType} Report Now (Unlocked 🎉)</span>
              </button>
            ) : (
              <button
                disabled
                className="btn-disabled w-full justify-center opacity-60 cursor-not-allowed py-3 text-xs text-slate-400 border border-slate-700 bg-slate-900"
              >
                <span>Please wait {timer}s for Ad verification...</span>
              </button>
            )}
          </div>
        )}

        <div className="text-[11px] text-slate-500 font-mono text-center flex items-center justify-center gap-1 mt-3">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Watch 1 Ad = Unlimited Report Downloads!
        </div>
      </div>
    </div>
  );
};

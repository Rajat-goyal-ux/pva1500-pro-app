'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import { Crown, Check, X, Shield, Sparkles, Zap, CreditCard } from 'lucide-react';

export const UpgradeModal = ({ isOpen, onClose }) => {
  const { isPro, upgradeToPro, downgradeToFree } = useAuth();
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setProcessing(true);
    setTimeout(() => {
      upgradeToPro();
      setProcessing(false);
      
      // Fire celebration confetti!
      if (typeof window !== 'undefined') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-xl w-full p-6 md:p-8 relative border-amber-500/40 shadow-2xl shadow-amber-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 mb-3 animate-bounce">
            <Crown className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-syne text-white">
            Upgrade to <span className="text-amber-400">PVA-1500 Pro</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Unlock enterprise IEC 60891 analytics, clean PDF reports & unlimited bulk analysis
          </p>
        </div>

        {/* Feature Matrix */}
        <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1">FREE TIER</div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Basic STC Corrections</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Up to 5 CSVs per batch</li>
              <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-rose-400" /> AdSense Ads Shown</li>
              <li className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-rose-400" /> Watermarked PDF Reports</li>
            </ul>
          </div>

          <div className="p-3 bg-gradient-to-b from-amber-500/10 to-slate-900/80 rounded-xl border border-amber-500/40">
            <div className="font-bold text-amber-400 mb-2 border-b border-amber-500/30 pb-1 flex items-center justify-between">
              <span>PRO TIER</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <ul className="space-y-2 text-slate-200">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Advanced I-V Graphs</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Bulk CSV Uploads</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Ad-Free Experience</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unwatermarked PDF & XLSX</li>
            </ul>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-slate-400 font-mono">Subscription Price</div>
            <div className="text-xl font-bold font-syne text-white">$9.99 <span className="text-xs font-mono text-slate-400">/ month</span></div>
          </div>
          {isPro ? (
            <button
              onClick={downgradeToFree}
              className="btn-outline text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10"
            >
              Downgrade to Free
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={processing}
              className="btn-primary bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-6 py-2.5 shadow-lg shadow-amber-500/20"
            >
              {processing ? (
                <span>Processing...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Unlock Pro Plan</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="text-[11px] text-slate-500 font-mono text-center flex items-center justify-center gap-1">
          <Shield className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit Encrypted Secure Checkout (Simulated)
        </div>
      </div>
    </div>
  );
};

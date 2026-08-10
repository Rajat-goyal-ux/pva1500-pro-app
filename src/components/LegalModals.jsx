import React from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

export const LegalModals = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold font-syne text-white">Privacy Policy & Security</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <p>Your privacy and solar plant data confidentiality are our top priority.</p>
              <p><b>1. Local In-Browser Data Processing:</b> All PVA-1500 CSV parsing, temperature corrections, and STC calculations take place locally inside your browser runtime. Raw IV curve CSV data is never uploaded or saved to remote databases.</p>
              <p><b>2. Authentication:</b> Google Authentication is managed via secure Firebase OAuth tokens solely to authenticate user identity and manage subscription status.</p>
              <p><b>3. Cookies & Ads:</b> Free tier users may see Google AdSense advertisements. AdSense uses anonymized telemetry cookies to serve non-intrusive ads.</p>
            </div>
          </div>
        )}

        {activeModal === 'terms' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold font-syne text-white">Terms of Service</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <p><b>1. Professional Usage:</b> The PVA-1500 Pro Analyzer is designed for solar PV inspectors, EPC engineers, and O&M contractors.</p>
              <p><b>2. IEC 60891 Calculation Standard:</b> While our formulas strictly follow IEC 60891 standards for temperature & irradiance corrections, final field verification remains the certified inspector's responsibility.</p>
              <p><b>3. Subscription Terms:</b> Pro Tier subscriptions auto-renew monthly and can be canceled at any time from your account profile.</p>
            </div>
          </div>
        )}

        {activeModal === 'copyright' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold font-syne text-white">Copyright & Compliance</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 font-mono leading-relaxed">
              <p>© 2026 PVA-1500 Pro IV Analysis Platform. All rights reserved.</p>
              <p>Solmetric and PVA-1500 are registered trademarks of their respective owners. This web application provides independent IEC 60891 analysis tooling for solar industry professionals.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Zap, LogOut, LogIn, Crown, Sun, Moon, HelpCircle } from 'lucide-react';

export const Header = ({ onOpenUpgrade, onOpenFeedback, darkMode, setDarkMode }) => {
  const { user, isPro, loginWithGoogle, logout } = useAuth();

  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-2 border-b border-white/10 flex flex-col items-center justify-center text-center gap-2 z-50 relative">
      
      {/* Row 1: Centered Brand Logo & Title */}
      <div className="flex items-center justify-center text-center gap-3">
        <div className="relative group shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-violet-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative w-8 h-8 bg-[#090d16] rounded-lg flex items-center justify-center border border-white/10">
            <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <h1 className="text-lg font-bold font-syne tracking-tight text-white">
            PVA-1500 <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">Pro</span>
          </h1>
          {isPro ? (
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-[10px] font-syne px-2.5 py-0.5 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-1">
              <Crown className="w-3 h-3 fill-current" /> PRO
            </span>
          ) : (
            <span className="bg-slate-800/80 text-slate-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-slate-700">
              FREE TIER
            </span>
          )}
        </div>
      </div>

      {/* Subtitle with Live Pulse Status */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono text-center">
        <span>IEC 60891 Solar PV Analytics Engine</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Live Active
        </span>
      </div>

      {/* Row 2: Centered Actions & Profile */}
      <div className="flex flex-wrap items-center justify-center text-center gap-3 pt-1">
        {!isPro && (
          <button onClick={onOpenUpgrade} className="btn-animated-cyber py-1.5 px-3.5 text-xs">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>Upgrade Pro</span>
          </button>
        )}

        <button onClick={onOpenFeedback} className="btn-animated-glass py-1.5 px-3.5 text-xs">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Support</span>
        </button>

        <button onClick={() => setDarkMode(!darkMode)} className="btn-animated-glass p-2 rounded-xl text-slate-300">
          {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {user ? (
          <div className="flex items-center justify-center gap-2.5 px-3 py-1 bg-slate-900/80 border border-white/10 rounded-full text-center">
            <img
              src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user.displayName}
              style={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                minHeight: '28px',
                maxWidth: '28px',
                maxHeight: '28px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <span className="text-xs font-bold text-white font-syne truncate max-w-[120px]">{user.displayName}</span>
            <button onClick={logout} className="p-1 text-rose-400 hover:text-rose-300" title="Sign Out">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={loginWithGoogle} className="btn-animated-cyber py-1.5 px-3.5 text-xs">
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign in with Google</span>
          </button>
        )}
      </div>

    </header>
  );
};

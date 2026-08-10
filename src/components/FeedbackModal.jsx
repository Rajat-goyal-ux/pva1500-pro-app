import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, LifeBuoy } from 'lucide-react';

export const FeedbackModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('PVA-1500 CSV Parsing Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <LifeBuoy className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-bold font-syne text-white">Feedback & Technical Support</h3>
        </div>

        {submitted ? (
          <div className="py-8 text-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-base font-bold font-syne text-white">Thank You!</h4>
            <p className="text-xs text-slate-400 font-mono mt-1">Your message has been sent to support@pva1500-pro.com</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="inspector@solar.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-field"
              >
                <option value="PVA-1500 CSV Parsing Query">PVA-1500 CSV Parsing Query</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing & Pro Tier Help">Billing & Pro Tier Help</option>
                <option value="Report Bug">Report Bug</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Message</label>
              <textarea
                required
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or feedback..."
                className="input-field py-2"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-2.5">
              <Send className="w-4 h-4" />
              <span>Submit Support Ticket</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock, KeyRound, ShieldAlert, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (password.trim() === validPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_login_time', new Date().toISOString());
      }
      router.push('/admin');
    } else {
      setError('Invalid admin access key. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 flex-1 flex items-center justify-center py-12 md:py-16 w-full">
        <div className="bg-white w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold font-heading text-center text-slate-900 mb-2 tracking-tight">
            Admin Portal Login
          </h1>
          <p className="text-xs text-slate-500 text-center mb-8 font-medium leading-relaxed">
            Enter key to manage postings, monitor job view metrics & trigger AI scrapers.
          </p>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs mb-6 flex items-center gap-2 font-semibold">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                Secret Password Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter secret admin key"
                  className="hague-input pl-11 text-sm py-3 rounded-xl border-slate-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-hague-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-xl"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

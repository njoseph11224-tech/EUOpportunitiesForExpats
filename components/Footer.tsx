import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-slate-900 font-heading">
              Work in Europe Job Portal
            </span>
            <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              100% Free Tier
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium text-slate-500">
            <span>Powered by <strong>Google Gemini AI</strong></span>
            <span>Data: <strong>EURES • LinkedIn • Google Jobs</strong></span>
            <span>Framework: <strong>Next.js + Supabase</strong></span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} EU Visa Opportunities for Expats. Designed with Hague municipal layout.</p>
          <div className="flex gap-6 font-semibold">
            <a href="/admin/login" className="hover:text-blue-700 transition-colors">Admin Login</a>
            <a href="/api/cron/scrape" target="_blank" className="hover:text-purple-700 transition-colors">Trigger AI Sync</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

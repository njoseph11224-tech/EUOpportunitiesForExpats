import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-slate-900 font-heading">
              Work in Europe Job Portal
            </span>
            <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              Verified Expat Opportunities
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} EU Visa Opportunities for Expats. All Rights Reserved.
          </p>

          <div className="flex gap-5 text-[11px] font-semibold text-slate-500">
            <a href="/admin/login" className="hover:text-blue-700 transition-colors">Admin Login</a>
            <a href="/api/cron/scrape" target="_blank" className="hover:text-purple-700 transition-colors">Trigger Sync</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

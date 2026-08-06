import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-black text-sm text-slate-900 font-heading">
              EUVisaJobs.eu
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
              Verified Expat Opportunities
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/about" className="hover:text-blue-700 transition-colors">
              About Us
            </Link>
            <Link href="/developer" className="hover:text-purple-700 transition-colors">
              Developer Info
            </Link>
            <Link href="/privacy" className="hover:text-emerald-700 transition-colors">
              Privacy Statement
            </Link>
            <Link href="/privacy#contact" className="hover:text-teal-700 transition-colors">
              Privacy Contact
            </Link>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} EU Visa Opportunities for Expats. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Link from 'next/link';
import { Globe, Briefcase, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 py-3.5 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-700/20 group-hover:bg-blue-800 transition-colors">
            <Globe className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl font-heading text-slate-900 tracking-tight">
                Work in Europe
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Visa Portal
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              European Expat Visa Sponsorship Jobs
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Jobs</span>
          </Link>

          <Link
            href="/admin"
            className="btn-hague-primary text-xs py-2.5 px-4 rounded-lg flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

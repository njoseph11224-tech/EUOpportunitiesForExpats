'use client';

import React from 'react';

interface Company {
  name: string;
  logoBg: string;
  logoColor: string;
  logoContent: React.ReactNode;
}

interface CompanyFilterBarProps {
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
}

export default function CompanyFilterBar({ selectedCompany, onSelectCompany }: CompanyFilterBarProps) {
  const companies: Company[] = [
    {
      name: 'Figma',
      logoBg: 'bg-black text-white',
      logoColor: '#000000',
      logoContent: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="4" r="4" fill="#F24E1E"/>
          <circle cx="16" cy="4" r="4" fill="#FF7262"/>
          <circle cx="8" cy="12" r="4" fill="#A259FF"/>
          <circle cx="16" cy="12" r="4" fill="#1ABCFE"/>
          <circle cx="8" cy="20" r="4" fill="#0ACF83"/>
        </svg>
      ),
    },
    {
      name: 'Amazon',
      logoBg: 'bg-[#131921] text-white',
      logoColor: '#131921',
      logoContent: (
        <span className="font-extrabold text-[10px] tracking-tight text-white">amazon</span>
      ),
    },
    {
      name: 'Meta',
      logoBg: 'bg-[#0064e0] text-white',
      logoColor: '#0064e0',
      logoContent: (
        <span className="font-extrabold text-sm text-white">∞</span >
      ),
    },
    {
      name: 'Dropbox',
      logoBg: 'bg-[#0061ff] text-white',
      logoColor: '#0061ff',
      logoContent: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M6 2l6 3.8L6 9.6 0 5.8 6 2zm12 0l6 3.8-6 3.8-6-3.8 6-3.8zM0 13.4l6-3.8 6 3.8-6 3.8-6-3.8zm18-3.8l6 3.8-6 3.8-6-3.8 6-3.8zM6 18.2l6-3.8 6 3.8-6 3.8-6-3.8z"/>
        </svg>
      ),
    },
    {
      name: 'HappyCo',
      logoBg: 'bg-[#00c58d] text-white',
      logoColor: '#00c58d',
      logoContent: (
        <span className="font-extrabold text-xs text-white">co</span>
      ),
    },
    {
      name: 'Google',
      logoBg: 'bg-white text-slate-900 border border-slate-200',
      logoColor: '#4285F4',
      logoContent: (
        <span className="font-black text-sm text-[#4285F4]">G</span>
      ),
    },
    {
      name: 'Apple',
      logoBg: 'bg-black text-white',
      logoColor: '#000000',
      logoContent: (
        <span className="font-extrabold text-sm text-white"></span>
      ),
    },
    {
      name: 'Twitter',
      logoBg: 'bg-[#1da1f2] text-white',
      logoColor: '#1da1f2',
      logoContent: (
        <span className="font-black text-xs text-white">𝕏</span>
      ),
    },
    {
      name: 'Uber',
      logoBg: 'bg-black text-white',
      logoColor: '#000000',
      logoContent: (
        <span className="font-extrabold text-xs text-white">Uber</span>
      ),
    },
    {
      name: 'Snapchat',
      logoBg: 'bg-[#fffc00] text-black',
      logoColor: '#fffc00',
      logoContent: (
        <span className="font-extrabold text-sm text-black">👻</span>
      ),
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight">
        Recent job offers from
      </h3>

      <div className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none">
        {/* All Companies Button */}
        <button
          onClick={() => onSelectCompany('ALL')}
          className={`flex flex-col items-center gap-2 group flex-shrink-0 transition-all ${
            selectedCompany === 'ALL' ? 'scale-105' : 'opacity-80 hover:opacity-100'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all border ${
              selectedCompany === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-4 ring-slate-900/10'
                : 'bg-white text-slate-700 border-slate-200 group-hover:border-slate-400'
            }`}
          >
            <span className="font-extrabold text-xs uppercase">All</span>
          </div>
          <span className="text-xs font-semibold text-slate-700">All Jobs</span>
        </button>

        {/* Company Avatars */}
        {companies.map(company => {
          const isSelected = selectedCompany.toLowerCase() === company.name.toLowerCase();
          return (
            <button
              key={company.name}
              onClick={() => onSelectCompany(company.name)}
              className={`flex flex-col items-center gap-2 group flex-shrink-0 transition-all ${
                isSelected ? 'scale-105' : 'opacity-85 hover:opacity-100'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${company.logoBg} ${
                  isSelected ? 'ring-4 ring-blue-500/20 shadow-md border-2 border-blue-600' : 'border border-slate-200'
                }`}
              >
                {company.logoContent}
              </div>
              <span className={`text-xs font-semibold ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                {company.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

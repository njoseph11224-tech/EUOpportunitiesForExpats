import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Code, Terminal, Cpu, Database, Github, Globe, Layers } from 'lucide-react';

export const metadata = {
  title: 'Developer Details & Engineering | EUVisaJobs.eu',
  description: 'Technical architecture, developer specifications, and open source details behind EUVisaJobs.eu.',
};

export default function DeveloperPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-purple-50 text-purple-700 text-xs font-extrabold px-3 py-1 rounded-full border border-purple-200 uppercase tracking-wider">
            Developer & Engineering
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-heading mt-3 mb-4 tracking-tight">
            Technical Architecture & Developer
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            EUVisaJobs.eu is engineered as a modern, high-performance Web Application leveraging Next.js 16 (App Router), Turbopack, Supabase PostgreSQL, and Google Gemini AI.
          </p>
        </div>

        {/* Developer Info Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-2xl font-black font-heading shadow-lg shadow-blue-700/20">
              NJ
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-heading">Nithin Joseph</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Lead Systems Architect & Full Stack Engineer</p>
              <span className="inline-block mt-2 text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                GitHub: njoseph11224-tech
              </span>
            </div>
          </div>

          <a
            href="https://github.com/njoseph11224-tech/EUOpportunitiesForExpats"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hague-primary text-xs py-3 px-5 rounded-xl flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>
        </div>

        {/* Tech Stack Specs Grid */}
        <h2 className="text-xl font-black text-slate-900 font-heading mb-6">Core Engineering Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Layers className="w-6 h-6 text-blue-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">Next.js 16 (Turbopack)</h4>
            <p className="text-xs text-slate-500">React 19 App Router architecture with server components & dynamic API routing.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Database className="w-6 h-6 text-emerald-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">Supabase PostgreSQL</h4>
            <p className="text-xs text-slate-500">Relational PostgreSQL database engine with Row Level Security (RLS) & RPC functions.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Cpu className="w-6 h-6 text-purple-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">Google Gemini AI Engine</h4>
            <p className="text-xs text-slate-500">Multi-candidate generative AI module extracting emails, visa schemes, and summaries.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Code className="w-6 h-6 text-teal-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">TypeScript</h4>
            <p className="text-xs text-slate-500">100% strict type safety across database schemas, scrapers, and UI components.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Terminal className="w-6 h-6 text-amber-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">Scraper Orchestrator</h4>
            <p className="text-xs text-slate-500">Multi-source scraper engine connecting to EURES, Make in Germany, UWV, and tech portals.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <Globe className="w-6 h-6 text-sky-600 mb-3" />
            <h4 className="font-extrabold text-slate-900 text-sm mb-1">Edge Deployment</h4>
            <p className="text-xs text-slate-500">Deployed globally on Vercel Edge Network with SSL and automatic DNS resolution.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

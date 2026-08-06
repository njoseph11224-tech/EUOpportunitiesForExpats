import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Globe, ShieldCheck, Sparkles, Building2, Users, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | EUVisaJobs.eu',
  description: 'Learn about EUVisaJobs.eu - The premier platform connecting international professionals with verified European work visa sponsorship jobs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="bg-blue-50 text-blue-700 text-xs font-extrabold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            Our Mission
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-heading mt-3 mb-4 tracking-tight">
            Connecting Global Talent with European Opportunities
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            EUVisaJobs.eu is built to solve one major challenge for non-EU expats: finding genuine jobs in Europe that provide official work visa sponsorship and relocation support.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Verified Visa Programs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every job listing highlights specific visa schemes including the German EU Blue Card, Dutch IND Recognized Sponsor (30% Tax Ruling), Irish CSEP, and French Passeport Talent.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">AI Job Enrichment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Powered by Google Gemini AI, raw job postings are automatically enriched with contact emails, recruiter LinkedIn profiles, and 2-sentence executive summaries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2">Official EU Sources</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aggregates job listings directly from official European labor exchanges like EURES, Make in Germany, UWV Netherlands, Workindenmark, Arbetsförmedlingen, and top EU employers.
            </p>
          </div>
        </div>

        {/* Detailed Story Section */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-md mb-12 space-y-6 text-slate-700 text-sm leading-relaxed font-medium">
          <h2 className="text-2xl font-black text-slate-900 font-heading">Why We Built EUVisaJobs.eu</h2>
          <p>
            Navigating job boards in Europe can be frustrating for international applicants. Most job portals do not specify whether an employer is willing to sponsor non-EU work permits, resulting in hundreds of wasted job applications.
          </p>
          <p>
            EUVisaJobs.eu centralizes verified vacancies from recognized sponsors across 15+ European countries, filtering out local-only listings and giving expats direct contact information for recruiters.
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="btn-apply-exact inline-flex items-center gap-2 px-6 py-3 text-xs">
            <span>Explore All Visa Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

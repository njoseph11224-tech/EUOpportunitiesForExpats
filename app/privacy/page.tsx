import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Privacy Contact | EUVisaJobs.eu',
  description: 'GDPR privacy statement, data protection guidelines, and privacy contact information for EUVisaJobs.eu.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
            GDPR Compliant
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-heading mt-3 mb-4 tracking-tight">
            Privacy Statement & Protection
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Your privacy is paramount. Read our data protection commitment and contact our Data Privacy Officer.
          </p>
        </div>

        {/* Core Principles */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-md mb-12 space-y-8 text-slate-700 text-sm font-medium leading-relaxed">
          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>1. General Data Protection Regulation (GDPR)</span>
            </h3>
            <p>
              EUVisaJobs.eu strictly adheres to the General Data Protection Regulation (EU) 2016/679. We do not sell, rent, or monetize your personal information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>2. Information We Collect</span>
            </h3>
            <p>
              We operate an open job search portal. Browsing job listings, searching by country/category, and viewing recruiter details do not require account registration. We store anonymous job view metrics to calculate popular listings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <span>3. External Recruiter & Employer Links</span>
            </h3>
            <p>
              When you click on an external "Apply" link or recruiter LinkedIn URL, you are redirected to third-party employer websites. We encourage you to review the privacy policy of each external site you visit.
            </p>
          </div>
        </div>

        {/* Privacy Contact Section */}
        <div id="contact" className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 md:p-10 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-black font-heading">Data Privacy Contact</h2>
          </div>

          <p className="text-sm text-slate-200 mb-6 leading-relaxed font-medium">
            If you have questions regarding data privacy, removal requests, or GDPR rights, contact our Data Protection Officer:
          </p>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-xs space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Privacy Officer Contact:</span>
              <span className="text-emerald-300 font-bold">privacy@euvisajobs.eu</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Technical Data Lead:</span>
              <span className="text-emerald-300 font-bold">njoseph11224-tech@github</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Jurisdiction:</span>
              <span className="text-white font-bold">European Union (GDPR / EEA)</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

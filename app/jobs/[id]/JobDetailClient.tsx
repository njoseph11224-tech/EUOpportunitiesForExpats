'use client';

import React, { useState } from 'react';
import { Job, formatExternalUrl } from '@/lib/types';
import {
  Building2,
  MapPin,
  Mail,
  Globe,
  Linkedin,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Sparkles,
  DollarSign,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

interface JobDetailClientProps {
  job: Job;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleTrackClick = async () => {
    try {
      await fetch(`/api/jobs/${job.id}/click`, { method: 'POST' });
    } catch (e) {
      console.error('Click track error:', e);
    }
  };

  const applyUrl = formatExternalUrl(job.original_url, job.company_name, job.title);

  const getCountryFlag = (code: string) => {
    const flags: Record<string, string> = {
      DE: '🇩🇪 Germany',
      NL: '🇳🇱 Netherlands',
      SE: '🇸🇪 Sweden',
      IE: '🇮🇪 Ireland',
      FR: '🇫🇷 France',
      ES: '🇪🇸 Spain',
      DK: '🇩🇰 Denmark',
      FI: '🇫🇮 Finland',
      AT: '🇦🇹 Austria',
      BE: '🇧🇪 Belgium',
      EU: '🇪🇺 EU Wide',
    };
    return flags[code.toUpperCase()] || `🇪🇺 ${job.location}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl my-6">
      {/* Top Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Visa Sponsorship Guaranteed
        </span>
        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
          {job.source}
        </span>
        <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full font-bold border border-slate-200">
          {getCountryFlag(job.country_code)}
        </span>
        <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>{job.click_count || 0} Views</span>
        </div>
      </div>

      {/* Job Title & Company */}
      <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-heading mb-3 leading-tight">
        {job.title}
      </h1>

      <div className="flex items-center gap-4 text-slate-600 mb-8 flex-wrap text-sm font-semibold">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-base">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>{job.company_name}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Posted {new Date(job.posted_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Visa & Relocation Package Highlight Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-6 rounded-2xl border border-emerald-200 mb-8 shadow-sm">
        <h4 className="text-xs uppercase font-extrabold text-emerald-800 flex items-center gap-2 mb-2 tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Visa & Relocation Assistance Package
        </h4>
        <p className="text-base text-slate-900 font-extrabold">{job.visa_details}</p>
        {job.salary_range && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white text-emerald-900 text-xs font-bold px-3.5 py-1.5 rounded-lg border border-emerald-200 shadow-sm">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Salary: {job.salary_range}</span>
          </div>
        )}
      </div>

      {/* Contact & Recruiter Email Details Box */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
        <h4 className="text-xs uppercase font-extrabold text-slate-700 flex items-center gap-2 mb-4 tracking-wider font-heading">
          <Mail className="w-4 h-4 text-purple-600" />
          Verified Contact & Recruiter Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Recruiter Email */}
          {job.recruiter_email ? (
            <div className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Recruiter Email {job.recruiter_name ? `(${job.recruiter_name})` : ''}
                </span>
                <span className="font-mono text-slate-900 text-xs font-bold">{job.recruiter_email}</span>
              </div>
              <button
                onClick={() => copyToClipboard(job.recruiter_email!)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
              >
                {copiedEmail === job.recruiter_email ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEmail === job.recruiter_email ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>Recruiter: Direct application via official portal</span>
            </div>
          )}

          {/* Company Email */}
          {job.company_email ? (
            <div className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Company Contact Email</span>
                <span className="font-mono text-slate-900 text-xs font-bold">{job.company_email}</span>
              </div>
              <button
                onClick={() => copyToClipboard(job.company_email!)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1 text-[11px]"
              >
                {copiedEmail === job.company_email ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEmail === job.company_email ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Company Contact: Direct career site application</span>
            </div>
          )}

          {/* Company Website */}
          {job.company_website && (
            <a
              href={formatExternalUrl(job.company_website, job.company_name)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-200 text-blue-700 hover:text-blue-800 transition-colors font-bold shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Company Careers Website</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Recruiter LinkedIn */}
          {job.recruiter_linkedin && (
            <a
              href={formatExternalUrl(job.recruiter_linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-200 text-sky-700 hover:text-sky-800 transition-colors font-bold shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-sky-600" />
                <span>Recruiter LinkedIn Profile</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* AI Summary */}
      <div className="mb-8">
        <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          AI Job Overview
        </h4>
        <p className="text-base text-slate-800 bg-slate-50 p-5 rounded-2xl border border-slate-200 leading-relaxed font-medium">
          {job.summary}
        </p>
      </div>

      {/* Full Description */}
      <div className="mb-10">
        <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-3">
          Full Requirements & Role Specifications
        </h4>
        <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200 font-medium">
          {job.description}
        </div>
      </div>

      {/* Direct Apply Button */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
        >
          ← Back to All Listings
        </Link>

        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTrackClick}
          className="btn-apply-exact text-sm py-4 px-8 rounded-xl flex items-center justify-center gap-2 font-black shadow-lg w-full sm:w-auto"
        >
          <span>Apply Directly on {job.source}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

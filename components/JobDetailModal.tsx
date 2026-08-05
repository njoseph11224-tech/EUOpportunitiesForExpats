'use client';

import React, { useState } from 'react';
import { Job, formatExternalUrl } from '@/lib/types';
import {
  X,
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
  UserCheck,
  Briefcase
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onTrackClick: (jobId: string) => void;
}

export default function JobDetailModal({ job, onClose, onTrackClick }: JobDetailModalProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  if (!job) return null;

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
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
    <div
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative border border-slate-200 shadow-2xl my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4 pr-10">
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
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-heading mb-2 leading-tight">
          {job.title}
        </h2>

        <div className="flex items-center gap-4 text-slate-600 mb-6 flex-wrap text-sm font-semibold">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Building2 className="w-4 h-4 text-blue-600" />
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
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-5 rounded-2xl border border-emerald-200 mb-6 shadow-sm">
          <h4 className="text-xs uppercase font-extrabold text-emerald-800 flex items-center gap-2 mb-1.5 tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Visa & Relocation Assistance Details
          </h4>
          <p className="text-sm text-slate-800 font-bold">{job.visa_details}</p>
          {job.salary_range && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white text-emerald-900 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200 shadow-sm">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Salary: {job.salary_range}</span>
            </div>
          )}
        </div>

        {/* Contact & Recruiter Email Details Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
          <h4 className="text-xs uppercase font-extrabold text-slate-700 flex items-center gap-2 mb-4 tracking-wider font-heading">
            <Mail className="w-4 h-4 text-purple-600" />
            Verified Contact & Recruiter Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Recruiter Email */}
            {job.recruiter_email ? (
              <div className="bg-white p-3.5 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
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
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-slate-400" />
                <span>Recruiter: Available via direct portal application</span>
              </div>
            )}

            {/* Company Email */}
            {job.company_email ? (
              <div className="bg-white p-3.5 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
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
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-medium flex items-center gap-2">
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
                className="bg-white p-3.5 rounded-xl flex items-center justify-between border border-slate-200 text-blue-700 hover:text-blue-800 transition-colors font-bold shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Company Careers Website</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Recruiter LinkedIn */}
            {job.recruiter_linkedin && (
              <a
                href={formatExternalUrl(job.recruiter_linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3.5 rounded-xl flex items-center justify-between border border-slate-200 text-sky-700 hover:text-sky-800 transition-colors font-bold shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-sky-600" />
                  <span>Recruiter LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-6">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            AI Job Summary
          </h4>
          <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-medium">
            {job.summary}
          </p>
        </div>

        {/* Full Job Requirements & Description */}
        <div className="mb-8">
          <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-2">
            Full Description & Requirements
          </h4>
          <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 max-h-60 overflow-y-auto font-medium">
            {job.description}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>

          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackClick(job.id)}
            className="btn-apply-exact text-xs py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer text-decoration-none"
          >
            <span>Apply Now on {job.source}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

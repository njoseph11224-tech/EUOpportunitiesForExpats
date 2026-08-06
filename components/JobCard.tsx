'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Job } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
  onTrackClick: (jobId: string) => void;
  viewMode?: 'list' | 'grid';
  isFeatured?: boolean;
}

export default function JobCard({
  job,
  onSelectJob,
  onTrackClick,
  viewMode = 'grid',
  isFeatured = false,
}: JobCardProps) {
  const router = useRouter();

  const getCompanyColor = (company: string) => {
    const name = company.toLowerCase();
    if (name.includes('figma')) return { bg: 'bg-black text-white', icon: '🎨' };
    if (name.includes('amazon')) return { bg: 'bg-[#131921] text-amber-400 font-extrabold text-[10px]', icon: 'amazon' };
    if (name.includes('meta') || name.includes('facebook')) return { bg: 'bg-[#0064e0] text-white', icon: '∞' };
    if (name.includes('dropbox')) return { bg: 'bg-[#0061ff] text-white', icon: '📦' };
    if (name.includes('happy')) return { bg: 'bg-[#00c58d] text-white font-bold', icon: 'co' };
    if (name.includes('google')) return { bg: 'bg-white text-[#4285F4] border border-slate-200 font-black', icon: 'G' };
    if (name.includes('spotify')) return { bg: 'bg-[#1ed760] text-black font-bold', icon: '♫' };
    if (name.includes('zalando')) return { bg: 'bg-[#ff6900] text-white font-bold', icon: 'Z' };
    if (name.includes('asml')) return { bg: 'bg-[#0f172a] text-sky-400 font-extrabold', icon: 'ASML' };
    return { bg: 'bg-slate-900 text-white font-bold', icon: company[0] || 'EU' };
  };

  const getCompanyAvatar = (name: string) => {
    const config = getCompanyColor(name);
    return (
      <div className={`w-11 h-11 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0 text-sm shadow-sm`}>
        {config.icon}
      </div>
    );
  };

  const handleCardNavigate = () => {
    onTrackClick(job.id);
    router.push(`/jobs/${job.id}`);
  };

  const featured = isFeatured || job.click_count > 50 || job.visa_sponsorship;

  // --- LISTED ROW FORMAT ---
  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardNavigate}
        className={`job-card-exact cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 ${
          featured ? 'ring-2 ring-purple-400/50 shadow-md' : ''
        }`}
      >
        <div className="flex items-center gap-4 flex-1">
          {getCompanyAvatar(job.company_name)}

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h3 className={`text-base md:text-lg font-extrabold ${featured ? 'gradient-title' : 'text-slate-900'}`}>
                {job.title}
              </h3>
              <span className="badge-employee text-[11px]">
                {job.job_type || 'Employee'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold flex-wrap mb-2">
              <span className="text-slate-900 font-bold">{job.company_name}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{job.visa_details}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="meta-pill">{job.job_type}</span>
              <span className="meta-pill">{job.location.includes('Remote') ? 'Remote' : job.country_code}</span>
              {job.salary_range && <span className="meta-pill">{job.salary_range}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div>
            <div className="text-xs font-bold text-slate-900">
              {job.recruiter_name || 'Talent Acquisition'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Recruiter @{job.company_name}
            </div>
          </div>

          <Link
            href={`/jobs/${job.id}`}
            onClick={e => {
              e.stopPropagation();
              onTrackClick(job.id);
            }}
            className="btn-apply-exact text-decoration-none"
          >
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // --- TILED GRID CARD FORMAT ---
  return (
    <div
      onClick={handleCardNavigate}
      className={`job-card-exact cursor-pointer group flex flex-col justify-between relative ${
        featured ? 'ring-2 ring-purple-500/60 shadow-lg' : ''
      }`}
    >
      <div>
        {/* Top Row: Company Avatar + Company Name + Tag */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            {getCompanyAvatar(job.company_name)}
            <span className="font-bold text-slate-700 text-sm">{job.company_name}</span>
          </div>

          <span className={job.job_type === 'Contract' ? 'badge-freelance' : 'badge-employee'}>
            {job.job_type === 'Contract' ? 'Freelance' : 'Employee'}
          </span>
        </div>

        {/* Title: Large Bold Font */}
        <h3 className={`text-xl font-black mb-4 leading-snug tracking-tight ${featured ? 'gradient-title' : 'text-slate-900'}`}>
          {job.title}
        </h3>

        {/* Metadata Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="meta-pill">{job.job_type}</span>
          <span className="meta-pill">{job.location.split(',')[0]}</span>
          <span className="meta-pill">{job.salary_range || 'EU Visa Sponsored'}</span>
        </div>
      </div>

      {/* Bottom Row: Recruiter Name & Role + Apply Button */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs font-bold text-slate-900 truncate">
            {job.recruiter_name || 'Recruiter'}
          </div>
          <div className="text-[11px] text-slate-500 font-medium truncate">
            {job.recruiter_name ? `Recruiter @${job.company_name}` : `Talent @${job.company_name}`}
          </div>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          onClick={e => {
            e.stopPropagation();
            onTrackClick(job.id);
          }}
          className="btn-apply-exact flex-shrink-0 text-decoration-none"
        >
          <span>Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

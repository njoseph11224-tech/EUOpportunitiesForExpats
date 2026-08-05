'use client';

import React from 'react';
import { JobFilterParams } from '@/lib/types';
import { Search, RotateCcw, ChevronDown, LayoutList, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
  filters: JobFilterParams;
  onChange: (newFilters: JobFilterParams) => void;
  onReset: () => void;
  totalJobs: number;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export default function FilterBar({
  filters,
  onChange,
  onReset,
  totalJobs,
  viewMode,
  onViewModeChange,
}: FilterBarProps) {
  const handleFieldChange = (field: keyof JobFilterParams, value: any) => {
    onChange({ ...filters, [field]: value, page: 1 });
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Search Input Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 sm:mb-5">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={e => handleFieldChange('search', e.target.value)}
            placeholder="Search job title, skills, or tech keywords..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={onReset}
            className="px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-2xl shadow-sm">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tiled Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pill Dropdowns Row - Touch Scrollable on Mobile */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
        {/* Type Select */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.category || 'ALL'}
            onChange={e => handleFieldChange('category', e.target.value)}
            className="filter-pill-select pr-8 appearance-none text-xs"
          >
            <option value="ALL">Type: All</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data & AI">Data & AI</option>
            <option value="Product & Design">Product & Design</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Engineering">Engineering</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Time Select */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.job_type || 'ALL'}
            onChange={e => handleFieldChange('job_type', e.target.value)}
            className="filter-pill-select pr-8 appearance-none text-xs"
          >
            <option value="ALL">Time: All</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Source / Seniority Select */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.source || 'ALL'}
            onChange={e => handleFieldChange('source', e.target.value)}
            className="filter-pill-select pr-8 appearance-none text-xs"
          >
            <option value="ALL">Source: All</option>
            <option value="EURES">EURES (Govt)</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Google Jobs">Google Jobs</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Location Select */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.country || 'ALL'}
            onChange={e => handleFieldChange('country', e.target.value)}
            className="filter-pill-select pr-8 appearance-none text-xs"
          >
            <option value="ALL">Location: All EU</option>
            <option value="DE">Germany 🇩🇪</option>
            <option value="NL">Netherlands 🇳🇱</option>
            <option value="SE">Sweden 🇸🇪</option>
            <option value="IE">Ireland 🇮🇪</option>
            <option value="FR">France 🇫🇷</option>
            <option value="ES">Spain 🇪🇸</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Date Posted Select */}
        <div className="relative flex-shrink-0">
          <select
            value={filters.date_posted || 'all'}
            onChange={e => handleFieldChange('date_posted', e.target.value)}
            className="filter-pill-select pr-8 appearance-none text-xs"
          >
            <option value="all">Date: Anytime</option>
            <option value="24h">Past 24 Hours</option>
            <option value="7d">Past 7 Days</option>
            <option value="30d">Past 30 Days</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

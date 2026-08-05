'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterBar from '@/components/FilterBar';
import JobCard from '@/components/JobCard';
import JobDetailModal from '@/components/JobDetailModal';
import { Job, JobFilterParams } from '@/lib/types';
import { RefreshCw, ChevronLeft, ChevronRight, Building } from 'lucide-react';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // View Mode: 'grid' (Tiled Grid format matching reference image) or 'list'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<JobFilterParams>({
    search: '',
    country: 'ALL',
    source: 'ALL',
    category: 'ALL',
    date_posted: 'all',
    visa_only: true,
    sort_by: 'newest',
    page: 1,
    limit: 12,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.search) query.set('search', filters.search);
      if (filters.country && filters.country !== 'ALL') query.set('country', filters.country);
      if (filters.source && filters.source !== 'ALL') query.set('source', filters.source);
      if (filters.category && filters.category !== 'ALL') query.set('category', filters.category);
      if (filters.date_posted) query.set('date_posted', filters.date_posted);
      if (filters.sort_by) query.set('sort_by', filters.sort_by);
      if (filters.visa_only) query.set('visa_only', 'true');
      query.set('page', String(filters.page || 1));
      query.set('limit', String(filters.limit || 12));

      const res = await fetch(`/api/jobs?${query.toString()}`);
      const data = await res.json();

      if (data.jobs) {
        setJobs(data.jobs);
        setTotalJobs(data.total || 0);
      }
    } catch (e) {
      console.error('Failed to fetch jobs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleTrackClick = async (jobId: string) => {
    try {
      await fetch(`/api/jobs/${jobId}/click`, { method: 'POST' });
      setJobs(prev =>
        prev.map(j => (j.id === jobId ? { ...j, click_count: (j.click_count || 0) + 1 } : j))
      );
      if (selectedJob && selectedJob.id === jobId) {
        setSelectedJob(prev => (prev ? { ...prev, click_count: (prev.click_count || 0) + 1 } : null));
      }
    } catch (e) {
      console.error('Click track error:', e);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      country: 'ALL',
      source: 'ALL',
      category: 'ALL',
      date_posted: 'all',
      visa_only: true,
      sort_by: 'newest',
      page: 1,
      limit: 12,
    });
  };

  const totalPages = Math.ceil(totalJobs / (filters.limit || 12)) || 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Filter Dropdown Pills & Search Bar */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalJobs={totalJobs}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Job Listings (Grid vs List mode) */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-slate-800 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-semibold">Loading EU visa sponsorship positions...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-12 text-center max-w-md mx-auto my-8 rounded-3xl border border-slate-200 shadow-sm">
            <Building className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Jobs Match Your Filters</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Try clearing search terms or selecting "Location: All EU".
            </p>
            <button onClick={handleResetFilters} className="btn-apply-exact mx-auto">
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Tiled Grid Layout (3 Columns) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobs.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                onSelectJob={setSelectedJob}
                onTrackClick={handleTrackClick}
                viewMode="grid"
                isFeatured={idx === 1 || idx === 6}
              />
            ))}
          </div>
        ) : (
          /* Listed Row Layout */
          <div className="flex flex-col gap-3 mb-12">
            {jobs.map((job, idx) => (
              <JobCard
                key={job.id}
                job={job}
                onSelectJob={setSelectedJob}
                onTrackClick={handleTrackClick}
                viewMode="list"
                isFeatured={idx === 1}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8">
            <button
              disabled={filters.page === 1}
              onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 flex items-center gap-1 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-extrabold text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Page {filters.page} of {totalPages}
            </span>

            <button
              disabled={filters.page === totalPages}
              onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 flex items-center gap-1 shadow-sm"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Detail Modal */}
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onTrackClick={handleTrackClick}
        />
      </main>

      <Footer />
    </div>
  );
}

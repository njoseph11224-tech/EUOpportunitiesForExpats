'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Job, AdminStats, CronLog } from '@/lib/types';
import {
  LayoutDashboard,
  Briefcase,
  Eye,
  Trash2,
  Edit,
  Plus,
  RefreshCw,
  Trash,
  CheckCircle,
  AlertCircle,
  LogOut,
  Sparkles,
  Search,
  Mail,
  ShieldCheck,
  X,
  Building
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [cronLogs, setCronLogs] = useState<CronLog[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [cleaning, setCleaning] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin_auth');
      if (!auth) {
        router.push('/admin/login');
        return;
      }
    }
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, jobsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/jobs?limit=100&visa_only=false'),
      ]);

      const statsData = await statsRes.json();
      const jobsData = await jobsRes.json();

      if (statsData.stats) setStats(statsData.stats);
      if (statsData.logs) setCronLogs(statsData.logs);
      if (jobsData.jobs) setJobs(jobsData.jobs);
    } catch (e) {
      console.error('Failed to load admin stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_auth');
    }
    router.push('/admin/login');
  };

  const handleTriggerSync = async () => {
    setSyncing(true);
    try {
      const secret = prompt('Enter your CRON_SECRET value set in Vercel (or press OK if not set):', '') || '';
      const headers: Record<string, string> = {};
      if (secret) headers['Authorization'] = `Bearer ${secret}`;

      const url = secret ? `/api/cron/scrape?key=${encodeURIComponent(secret)}` : '/api/cron/scrape';
      const res = await fetch(url, { method: 'POST', headers });
      const data = await res.json();

      if (!res.ok) {
        alert('Sync Error (401 Unauthorized): ' + (data.error || 'Please provide your CRON_SECRET'));
      } else {
        alert(data.message || `AI Scraper Sync Completed! Added ${data.jobsAdded || 0} jobs.`);
        fetchAdminData();
      }
    } catch (e) {
      alert('Sync failed: ' + (e as Error).message);
    } finally {
      setSyncing(false);
    }
  };

  const handleCleanupExpired = async () => {
    if (!confirm('Deactivate expired job listings past expiration date?')) return;
    setCleaning(true);
    try {
      const secret = prompt('Enter your CRON_SECRET value set in Vercel (or press OK if not set):', '') || '';
      const headers: Record<string, string> = {};
      if (secret) headers['Authorization'] = `Bearer ${secret}`;

      const url = secret ? `/api/cron/cleanup?key=${encodeURIComponent(secret)}` : '/api/cron/cleanup';
      const res = await fetch(url, { method: 'POST', headers });
      const data = await res.json();

      if (!res.ok) {
        alert('Cleanup Error: ' + (data.error || 'Please provide your CRON_SECRET'));
      } else {
        alert(data.message || 'Cleanup completed successfully!');
        fetchAdminData();
      }
    } catch (e) {
      alert('Cleanup failed: ' + (e as Error).message);
    } finally {
      setCleaning(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Delete this job posting permanently?')) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(prev => prev.filter(j => j.id !== id));
      fetchAdminData();
    } catch (e) {
      alert('Failed to delete job: ' + (e as Error).message);
    }
  };

  const handleSaveJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.title || !editingJob?.company_name) return;

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setEditingJob(null);
        fetchAdminData();
      }
    } catch (e) {
      alert('Save failed: ' + (e as Error).message);
    }
  };

  const filteredJobs = jobs.filter(j => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'ACTIVE'
        ? j.is_active
        : !j.is_active;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 flex-1 mb-16 w-full">
        {/* Header Title & Logout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                Admin Control Dashboard
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                System Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Manage postings, track user click metrics, trigger Gemini AI scrapes & cleanup expired listings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerSync}
              disabled={syncing}
              className="btn-hague-primary text-xs py-2.5 px-4 rounded-xl flex items-center gap-2"
            >
              <Sparkles className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Running Gemini Sync...' : 'Trigger AI Job Sync'}</span>
            </button>

            <button
              onClick={handleCleanupExpired}
              disabled={cleaning}
              className="btn-hague-outline text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 text-amber-700 border-amber-300 bg-amber-50"
            >
              <Trash className="w-3.5 h-3.5" />
              <span>Purge Expired</span>
            </button>

            <button
              onClick={handleLogout}
              className="btn-hague-outline text-xs py-2.5 px-3 rounded-xl flex items-center gap-1 text-rose-700 border-rose-300 bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics Stats Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Total Postings</span>
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-3xl font-black text-slate-900 font-heading">
              {stats?.total_jobs || jobs.length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Active Listings</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-3xl font-black text-emerald-600 font-heading">
              {stats?.active_jobs || 0}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Expired Jobs</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-3xl font-black text-amber-600 font-heading">
              {stats?.expired_jobs || 0}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Total Click Views</span>
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-3xl font-black text-purple-600 font-heading">
              {stats?.total_clicks || 0}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Visa Sponsored</span>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <span className="text-3xl font-black text-teal-700 font-heading">
              {stats?.visa_sponsored_jobs || 0}
            </span>
          </div>
        </div>

        {/* Job Management Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900 font-heading">Job Management & Click Metrics</h2>
              <button
                onClick={() => {
                  setEditingJob({
                    title: '',
                    company_name: '',
                    location: 'Berlin, Germany',
                    country_code: 'DE',
                    source: 'Manual',
                    visa_sponsorship: true,
                    visa_details: 'EU Blue Card & Relocation Grant',
                    category: 'Software Engineering',
                    job_type: 'Full-time',
                    description: '',
                    summary: '',
                    is_active: true,
                  });
                  setIsModalOpen(true);
                }}
                className="btn-hague-primary py-1.5 px-3.5 text-xs rounded-lg flex items-center gap-1 font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Job Post</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Filter table..."
                  className="hague-input pl-9 py-2 text-xs rounded-lg border-slate-300"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="hague-select py-2 text-xs rounded-lg border-slate-300 font-bold"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Expired / Inactive</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Job Title & Company</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Clicks</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-400 font-semibold">
                      No job postings match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="text-sm text-blue-700 leading-snug">{job.title}</div>
                        <div className="text-slate-500 text-xs font-normal">{job.company_name}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-semibold border border-slate-200">
                          {job.location}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="tag-chip tag-eures text-[10px]">
                          {job.source}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {job.company_email || job.recruiter_email ? (
                          <span className="text-purple-700 flex items-center gap-1 font-mono text-xs font-bold">
                            <Mail className="w-3.5 h-3.5 text-purple-600" />
                            {job.company_email || job.recruiter_email}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Direct Web</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-extrabold border border-blue-200">
                          🔥 {job.click_count || 0}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {job.is_active ? (
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                            ● Active
                          </span>
                        ) : (
                          <span className="text-amber-700 font-extrabold flex items-center gap-1">
                            ● Expired
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingJob(job);
                            setIsModalOpen(true);
                          }}
                          className="btn-hague-outline py-1 px-2.5 text-xs"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5 text-blue-600" />
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="btn-hague-outline py-1 px-2.5 text-xs text-rose-700 border-rose-200 bg-rose-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Logs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span>AI Scraper Sync Activity Logs</span>
          </h3>

          <div className="space-y-3">
            {cronLogs.length === 0 ? (
              <p className="text-xs text-slate-400 font-semibold">No sync activity logs recorded yet.</p>
            ) : (
              cronLogs.map(log => (
                <div
                  key={log.id}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="tag-chip tag-visa">{log.run_type}</span>
                    <span className="text-slate-700 font-medium">{log.message}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Edit / Add Job Modal */}
      {isModalOpen && editingJob && (
        <div className="hague-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-xl p-6 md:p-8 relative border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-4">
              {editingJob.id ? 'Edit Visa Job Posting' : 'Add New Visa Job Posting'}
            </h3>

            <form onSubmit={handleSaveJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title || ''}
                  onChange={e => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="hague-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editingJob.company_name || ''}
                    onChange={e => setEditingJob({ ...editingJob, company_name: e.target.value })}
                    className="hague-input"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location || ''}
                    onChange={e => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="hague-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Company Email</label>
                  <input
                    type="email"
                    value={editingJob.company_email || ''}
                    onChange={e => setEditingJob({ ...editingJob, company_email: e.target.value })}
                    placeholder="contact@company.com"
                    className="hague-input"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Recruiter Email</label>
                  <input
                    type="email"
                    value={editingJob.recruiter_email || ''}
                    onChange={e => setEditingJob({ ...editingJob, recruiter_email: e.target.value })}
                    placeholder="recruiter@company.com"
                    className="hague-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Visa Sponsorship Package</label>
                <input
                  type="text"
                  value={editingJob.visa_details || ''}
                  onChange={e => setEditingJob({ ...editingJob, visa_details: e.target.value })}
                  placeholder="e.g. German EU Blue Card Fast-Track Sponsorship"
                  className="hague-input"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editingJob.description || ''}
                  onChange={e => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="hague-input"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-hague-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-hague-primary">
                  Save Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

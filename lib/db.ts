import { createClient } from '@supabase/supabase-js';
import { Job, JobFilterParams, JobClickRecord, CronLog, AdminStats } from './types';

// Supabase client instance (if configured)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-supabase')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to generate valid 36-character RFC4122 UUIDs for Postgres compatibility
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Temp seed data removed per user request (empty array)
export const INITIAL_JOBS: Job[] = [];

// Memory store state (starts completely empty)
let memoryJobs: Job[] = [];
let memoryClicks: JobClickRecord[] = [];
let memoryLogs: CronLog[] = [];

// Helper to filter memory jobs
function filterJobsInMemory(params: JobFilterParams): { jobs: Job[]; total: number } {
  let filtered = memoryJobs.filter(j => j.is_active);

  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      j =>
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q)
    );
  }

  if (params.country && params.country !== 'ALL') {
    filtered = filtered.filter(j => j.country_code.toUpperCase() === params.country?.toUpperCase());
  }

  if (params.location && params.location !== 'ALL') {
    filtered = filtered.filter(j => j.location.toLowerCase().includes(params.location!.toLowerCase()));
  }

  if (params.source && params.source !== 'ALL') {
    filtered = filtered.filter(j => j.source.toLowerCase() === params.source!.toLowerCase());
  }

  if (params.category && params.category !== 'ALL') {
    filtered = filtered.filter(j => j.category === params.category);
  }

  if (params.job_type && params.job_type !== 'ALL') {
    filtered = filtered.filter(j => j.job_type === params.job_type);
  }

  if (params.visa_only) {
    filtered = filtered.filter(j => j.visa_sponsorship);
  }

  if (params.date_posted && params.date_posted !== 'all') {
    const now = Date.now();
    const millis =
      params.date_posted === '24h'
        ? 86400000
        : params.date_posted === '7d'
        ? 7 * 86400000
        : 30 * 86400000;
    filtered = filtered.filter(j => new Date(j.posted_at).getTime() >= now - millis);
  }

  // Sorting
  if (params.sort_by === 'clicks') {
    filtered.sort((a, b) => b.click_count - a.click_count);
  } else if (params.sort_by === 'expiring') {
    filtered.sort((a, b) => new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime());
  } else {
    // Default newest
    filtered.sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
  }

  const total = filtered.length;
  const page = params.page || 1;
  const limit = params.limit || 20;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { jobs: paginated, total };
}

export async function getJobs(params: JobFilterParams = {}): Promise<{ jobs: Job[]; total: number }> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('jobs').select('*', { count: 'exact' });

      if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,company_name.ilike.%${params.search}%,location.ilike.%${params.search}%,description.ilike.%${params.search}%`);
      }
      if (params.country && params.country !== 'ALL') {
        query = query.eq('country_code', params.country);
      }
      if (params.source && params.source !== 'ALL') {
        query = query.eq('source', params.source);
      }
      if (params.category && params.category !== 'ALL') {
        query = query.eq('category', params.category);
      }
      if (params.visa_only) {
        query = query.eq('visa_sponsorship', true);
      }

      query = query.eq('is_active', true).order('posted_at', { ascending: false });

      const page = params.page || 1;
      const limit = params.limit || 20;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, count, error } = await query.range(from, to);

      if (!error && data) {
        return { jobs: data as Job[], total: count || data.length };
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to memory store:', e);
    }
  }

  return filterJobsInMemory(params);
}

export async function getJobById(id: string): Promise<Job | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
      if (!error && data) return data as Job;
    } catch (e) {
      console.warn('Supabase fetch error, checking memory store:', e);
    }
  }
  return memoryJobs.find(j => j.id === id) || null;
}

export async function incrementJobClick(jobId: string, referrer?: string, ipHash?: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Record click record
      await supabase.from('job_clicks').insert({
        job_id: jobId,
        referrer: referrer || 'direct',
        user_ip_hash: ipHash || 'anonymous',
        clicked_at: new Date().toISOString(),
      });

      // 2. Increment count
      const { data } = await supabase.rpc('increment_click', { row_id: jobId });
      if (data) return data;
    } catch (e) {
      console.warn('Supabase click recording fallback:', e);
    }
  }

  // Memory fallback
  const job = memoryJobs.find(j => j.id === jobId);
  if (job) {
    job.click_count += 1;
    memoryClicks.push({
      id: `click-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      job_id: jobId,
      referrer: referrer || 'direct',
      user_ip_hash: ipHash || 'anonymous',
      clicked_at: new Date().toISOString(),
    });
    return job.click_count;
  }
  return 0;
}

export async function saveJob(jobData: Partial<Job>): Promise<{ job: Job; isDuplicate: boolean }> {
  // 1. Deduplication check: Search by original_url or (title + company_name)
  let existingJob: Job | null = null;

  if (isSupabaseConfigured && supabase) {
    try {
      if (jobData.original_url && jobData.original_url !== '#') {
        const { data } = await supabase
          .from('jobs')
          .select('*')
          .eq('original_url', jobData.original_url)
          .maybeSingle();
        if (data) existingJob = data as Job;
      }

      if (!existingJob && jobData.title && jobData.company_name) {
        const { data } = await supabase
          .from('jobs')
          .select('*')
          .ilike('title', jobData.title.trim())
          .ilike('company_name', jobData.company_name.trim())
          .maybeSingle();
        if (data) existingJob = data as Job;
      }
    } catch (e) {
      console.warn('Supabase duplicate lookup warning:', e);
    }
  }

  if (!existingJob) {
    existingJob =
      memoryJobs.find(
        j =>
          (jobData.original_url && jobData.original_url !== '#' && j.original_url === jobData.original_url) ||
          (jobData.title &&
            jobData.company_name &&
            j.title.toLowerCase().trim() === jobData.title.toLowerCase().trim() &&
            j.company_name.toLowerCase().trim() === jobData.company_name.toLowerCase().trim())
      ) || null;
  }

  const isDuplicate = Boolean(existingJob);
  const targetId = existingJob ? existingJob.id : jobData.id || generateUUID();

  const newJob: Job = {
    id: targetId,
    title: jobData.title || existingJob?.title || 'Untitled Position',
    company_name: jobData.company_name || existingJob?.company_name || 'Unknown Company',
    company_website: jobData.company_website || existingJob?.company_website || null,
    company_email: jobData.company_email || existingJob?.company_email || null,
    recruiter_name: jobData.recruiter_name || existingJob?.recruiter_name || null,
    recruiter_email: jobData.recruiter_email || existingJob?.recruiter_email || null,
    recruiter_linkedin: jobData.recruiter_linkedin || existingJob?.recruiter_linkedin || null,
    location: jobData.location || existingJob?.location || 'Europe',
    country_code: jobData.country_code || existingJob?.country_code || 'EU',
    source: jobData.source || existingJob?.source || 'Manual',
    original_url: jobData.original_url || existingJob?.original_url || '#',
    description: jobData.description || existingJob?.description || '',
    summary: jobData.summary || existingJob?.summary || 'Visa sponsorship opportunity.',
    visa_sponsorship: jobData.visa_sponsorship ?? existingJob?.visa_sponsorship ?? true,
    visa_details: jobData.visa_details || existingJob?.visa_details || 'Visa Sponsorship Provided',
    category: jobData.category || existingJob?.category || 'Software Engineering',
    job_type: jobData.job_type || existingJob?.job_type || 'Full-time',
    salary_range: jobData.salary_range || existingJob?.salary_range || null,
    posted_at: jobData.posted_at || existingJob?.posted_at || new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    is_active: true,
    click_count: existingJob ? existingJob.click_count : jobData.click_count || 0,
    created_at: existingJob?.created_at || new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('jobs').upsert(newJob).select().single();
      if (!error && data) return { job: data as Job, isDuplicate };
    } catch (e) {
      console.warn('Supabase save error:', e);
    }
  }

  // Memory store update or insert
  const existingIdx = memoryJobs.findIndex(j => j.id === targetId);
  if (existingIdx >= 0) {
    memoryJobs[existingIdx] = newJob;
  } else {
    memoryJobs.unshift(newJob);
  }

  return { job: newJob, isDuplicate };
}

export async function deleteJob(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }

  const initialLength = memoryJobs.length;
  memoryJobs = memoryJobs.filter(j => j.id !== id);
  return memoryJobs.length < initialLength;
}

export async function deleteJobs(ids: string[]): Promise<number> {
  if (!ids || ids.length === 0) return 0;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('jobs').delete().in('id', ids).select();
      if (!error && data) return data.length;
    } catch (e) {
      console.warn('Supabase batch delete error:', e);
    }
  }

  const initialLength = memoryJobs.length;
  memoryJobs = memoryJobs.filter(j => !ids.includes(j.id));
  return initialLength - memoryJobs.length;
}

export async function cleanupExpiredJobs(): Promise<number> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('jobs').update({ is_active: false }).lt('expires_at', now).select();
      if (!error && data) return data.length;
    } catch (e) {
      console.warn('Supabase cleanup error:', e);
    }
  }

  let count = 0;
  memoryJobs = memoryJobs.map(j => {
    if (new Date(j.expires_at) < new Date()) {
      count++;
      return { ...j, is_active: false };
    }
    return j;
  });
  return count;
}

export const deactivateExpiredJobs = cleanupExpiredJobs;

export async function getAdminStats(): Promise<AdminStats> {
  let allJobs = memoryJobs;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase.from('jobs').select('*');
      if (data) allJobs = data as Job[];
    } catch (e) {
      console.warn('Supabase stats error:', e);
    }
  }

  const total_jobs = allJobs.length;
  const active_jobs = allJobs.filter(j => j.is_active).length;
  const expired_jobs = allJobs.filter(j => !j.is_active || new Date(j.expires_at) < new Date()).length;
  const total_clicks = allJobs.reduce((acc, j) => acc + (j.click_count || 0), 0);
  const visa_sponsored_jobs = allJobs.filter(j => j.visa_sponsorship).length;

  const sources_breakdown: Record<string, number> = {};
  const country_breakdown: Record<string, number> = {};

  allJobs.forEach(j => {
    sources_breakdown[j.source] = (sources_breakdown[j.source] || 0) + 1;
    country_breakdown[j.country_code] = (country_breakdown[j.country_code] || 0) + 1;
  });

  return {
    total_jobs,
    active_jobs,
    expired_jobs,
    total_clicks,
    visa_sponsored_jobs,
    recent_clicks_7d: total_clicks,
    sources_breakdown,
    country_breakdown,
  };
}

export async function logCronExecution(log: Omit<CronLog, 'id' | 'created_at'>): Promise<CronLog> {
  const newLog: CronLog = {
    id: `log-${Date.now()}`,
    ...log,
    created_at: new Date().toISOString(),
  };

  memoryLogs.unshift(newLog);
  return newLog;
}

export async function getCronLogs(): Promise<CronLog[]> {
  return memoryLogs;
}

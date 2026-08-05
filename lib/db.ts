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

// Initial rich seed data of EU Visa Sponsorship Jobs with valid standard UUIDs
export const INITIAL_JOBS: Job[] = [
  {
    id: 'a1b2c3d4-e5f6-4a1b-8c9d-012345678901',
    title: 'Senior Backend Engineer (Go / Distributed Systems)',
    company_name: 'Zalando SE',
    company_website: 'https://corporate.zalando.com/en/jobs',
    company_email: 'tech-talent@zalando.de',
    recruiter_name: 'Anna Schmidt',
    recruiter_email: 'anna.schmidt@zalando.de',
    recruiter_linkedin: 'https://linkedin.com/in/annaschmidt-tech-recruiter',
    location: 'Berlin, Germany',
    country_code: 'DE',
    source: 'EURES',
    original_url: 'https://eures.europa.eu/job-detail/zalando-backend-go-101',
    description: 'We are seeking an experienced Senior Backend Engineer to build high-scale microservices processing millions of daily fashion orders. Requires 5+ years of experience with Go or Java. Full relocation assistance, German EU Blue Card fast-tracking, flight ticket, and 1 month temporary apartment provided.',
    summary: 'Zalando is hiring a Senior Backend Engineer in Berlin with full relocation support, flight booking, temporary housing, and fast-track EU Blue Card sponsorship.',
    visa_sponsorship: true,
    visa_details: 'Full Visa Sponsorship & Relocation Package (EU Blue Card Eligible, Flight + 30 Days Housing)',
    category: 'Software Engineering',
    job_type: 'Full-time',
    salary_range: '€85,000 - €105,000 / year',
    posted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
    is_active: true,
    click_count: 42,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'b2c3d4e5-f6a1-4b2c-9d0e-123456789012',
    title: 'Full Stack React & Node Developer (Relocation & Highly Skilled Migrant Visa)',
    company_name: 'ASML',
    company_website: 'https://www.asml.com/en/careers',
    company_email: 'careers@asml.com',
    recruiter_name: 'Wouter de Jong',
    recruiter_email: 'wouter.dejong@asml.com',
    recruiter_linkedin: 'https://linkedin.com/in/wouter-dejong-asml',
    location: 'Veldhoven / Eindhoven, Netherlands',
    country_code: 'NL',
    source: 'LinkedIn',
    original_url: 'https://linkedin.com/jobs/view/asml-fullstack-dev-102',
    description: 'Join ASML as a Full Stack Developer creating semiconductor equipment control dashboards using React, TypeScript, and Node.js. ASML is an official Recognized Sponsor by Dutch IND. We provide 30% Tax Ruling guidance, visa sponsorship for candidate & family, relocation grant.',
    summary: 'ASML is offering Highly Skilled Migrant Visa sponsorship and relocation to the Netherlands with eligibility for the Dutch 30% tax ruling.',
    visa_sponsorship: true,
    visa_details: 'IND Recognized Sponsor (Dutch Highly Skilled Migrant Visa + 30% Tax Ruling Eligible)',
    category: 'Software Engineering',
    job_type: 'Full-time',
    salary_range: '€75,000 - €95,000 / year',
    posted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 28 * 86400000).toISOString(),
    is_active: true,
    click_count: 89,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'c3d4e5f6-a1b2-4c3d-0e1f-234567890123',
    title: 'Senior Staff Data Scientist - AI / ML',
    company_name: 'Spotify',
    company_website: 'https://lifeatspotify.com',
    company_email: 'recruitment@spotify.com',
    recruiter_name: 'Elin Lindqvist',
    recruiter_email: 'elin.l@spotify.com',
    recruiter_linkedin: 'https://linkedin.com/in/elinlindqvist-spotify',
    location: 'Stockholm, Sweden (Hybrid)',
    country_code: 'SE',
    source: 'Google Jobs',
    original_url: 'https://jobs.google.com/spotify-data-scientist-stockholm',
    description: 'Spotify is looking for a Staff Data Scientist to drive recommendation engine algorithms. Must have expertise in Python, PyTorch, SQL, and big data systems (Spark/BigQuery). Swedish work permit sponsorship & relocation support included for non-EU applicants.',
    summary: 'Spotify Stockholm offers Swedish work permit sponsorship, relocation assistance, and competitive equity packages for senior AI/ML data scientists.',
    visa_sponsorship: true,
    visa_details: 'Swedish Work Permit Sponsorship & Full Relocation Service',
    category: 'Data & AI',
    job_type: 'Full-time',
    salary_range: 'SEK 850,000 - SEK 1,100,000 / year',
    posted_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 25 * 86400000).toISOString(),
    is_active: true,
    click_count: 114,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'd4e5f6a1-b2c3-4d4e-1f2a-345678901234',
    title: 'Cloud DevOps & Site Reliability Engineer (Critical Skills Employment Permit)',
    company_name: 'Stripe Ireland',
    company_website: 'https://stripe.com/jobs',
    company_email: 'ireland-jobs@stripe.com',
    recruiter_name: 'Ciaran O’Connor',
    recruiter_email: 'c.oconnor@stripe.com',
    recruiter_linkedin: 'https://linkedin.com/in/ciaranoconnor-stripe',
    location: 'Dublin, Ireland',
    country_code: 'IE',
    source: 'Government Portal',
    original_url: 'https://eures.europa.eu/job-detail/stripe-devops-dublin-104',
    description: 'Stripe Dublin is expanding its Infrastructure Reliability team. Seeking engineers skilled in AWS, Kubernetes, Terraform, and Python/Go. Qualifies for the Irish Critical Skills Employment Permit (CSEP) leading to Stamp 4 permanent residency after 2 years.',
    summary: 'Stripe Dublin provides Irish Critical Skills Employment Permit (CSEP) visa sponsorship with fast-track Stamp 4 residency path.',
    visa_sponsorship: true,
    visa_details: 'Irish Critical Skills Employment Permit (CSEP) + Stamp 4 Residency Path',
    category: 'Software Engineering',
    job_type: 'Full-time',
    salary_range: '€90,000 - €115,000 / year',
    posted_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 20 * 86400000).toISOString(),
    is_active: true,
    click_count: 67,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'e5f6a1b2-c3d4-4e5f-2a3b-456789012345',
    title: 'Medical Devices QA Specialist & Regulatory Engineer',
    company_name: 'Siemens Healthineers',
    company_website: 'https://www.siemens-healthineers.com/careers',
    company_email: 'careers.healthineers@siemens.com',
    recruiter_name: 'Dr. Michael Weber',
    recruiter_email: 'm.weber@siemens-healthineers.com',
    recruiter_linkedin: 'https://linkedin.com/in/dr-michael-weber-siemens',
    location: 'Erlangen / Munich, Germany',
    country_code: 'DE',
    source: 'EURES',
    original_url: 'https://eures.europa.eu/job-detail/siemens-qa-med-105',
    description: 'Siemens Healthineers seeks a Quality Assurance and EU MDR Regulatory Compliance Specialist. Experience with ISO 13485 and medical device regulations required. Full visa sponsorship under German Opportunity Card / EU Blue Card regulations.',
    summary: 'Siemens Healthineers offers German EU Blue Card / Skilled Worker visa sponsorship for medical device quality assurance professionals.',
    visa_sponsorship: true,
    visa_details: 'German EU Blue Card & Relocation Package',
    category: 'Healthcare',
    job_type: 'Full-time',
    salary_range: '€70,000 - €85,000 / year',
    posted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 15 * 86400000).toISOString(),
    is_active: true,
    click_count: 31,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'f6a1b2c3-d4e5-4f6a-3b4c-567890123456',
    title: 'Lead Product Manager - EU FinTech (Passeport Talent Visa)',
    company_name: 'Qonto',
    company_website: 'https://qonto.com/en/careers',
    company_email: 'jobs@qonto.com',
    recruiter_name: 'Claire Dubois',
    recruiter_email: 'claire.dubois@qonto.com',
    recruiter_linkedin: 'https://linkedin.com/in/clairedubois-recruiter',
    location: 'Paris, France (Hybrid)',
    country_code: 'FR',
    source: 'LinkedIn',
    original_url: 'https://linkedin.com/jobs/view/qonto-product-manager-106',
    description: 'Leading European B2B neobank Qonto is recruiting a Lead Product Manager in Paris. We sponsor the French French Tech / Passeport Talent visa (4-year multi-year residence permit for high-skilled tech talent and spouse work rights).',
    summary: 'Qonto Paris sponsors the French Passeport Talent visa with multi-year work authorization for non-EU product leaders.',
    visa_sponsorship: true,
    visa_details: 'French Passeport Talent (Tech) Visa + Family Work Rights',
    category: 'Product & Design',
    job_type: 'Full-time',
    salary_range: '€80,000 - €100,000 / year',
    posted_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 10 * 86400000).toISOString(),
    is_active: true,
    click_count: 55,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-678901234567',
    title: 'Senior Cyber Security Analyst (Spanish Digital Nomad / Tech Visa)',
    company_name: 'Glovo / Delivery Hero',
    company_website: 'https://jobs.glovoapp.com',
    company_email: 'security-careers@glovoapp.com',
    recruiter_name: 'Mateo Garcia',
    recruiter_email: 'mateo.garcia@glovoapp.com',
    recruiter_linkedin: 'https://linkedin.com/in/mateogarcia-glovo',
    location: 'Barcelona, Spain',
    country_code: 'ES',
    source: 'Google Jobs',
    original_url: 'https://jobs.google.com/glovo-security-barcelona-107',
    description: 'Glovo is searching for a Senior Cybersecurity Threat Analyst in Barcelona. Sponsoring Spain Highly Qualified Professional (HQP) Visa under the Ley de Startups (Startup Law). Fast visa clearance within 20 working days.',
    summary: 'Glovo Barcelona provides fast-track Spanish Highly Qualified Professional Tech Visa sponsorship under the new Spanish Startup Law.',
    visa_sponsorship: true,
    visa_details: 'Spanish Highly Qualified Professional (HQP) Visa under Ley de Startups',
    category: 'Software Engineering',
    job_type: 'Full-time',
    salary_range: '€65,000 - €80,000 / year',
    posted_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    expires_at: new Date(Date.now() + 12 * 86400000).toISOString(),
    is_active: true,
    click_count: 73,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  }
];

// Memory store state (fallback)
let memoryJobs: Job[] = [...INITIAL_JOBS];
let memoryClicks: JobClickRecord[] = [];
let memoryLogs: CronLog[] = [
  {
    id: 'log-001',
    run_type: 'SCRAPE',
    jobs_processed: 12,
    status: 'SUCCESS',
    message: 'Scraped EURES EU Portal & Google Jobs successfully.',
    created_at: new Date().toISOString(),
  },
];

// Helper function to seed Supabase database automatically if table is empty
export async function seedInitialJobsToSupabase(): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    console.log('Seeding initial EU visa jobs into Supabase...');
    for (const job of INITIAL_JOBS) {
      await supabase.from('jobs').upsert(job);
    }
  } catch (e) {
    console.warn('Auto-seed Supabase error:', e);
  }
}

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

      if (!error && data && data.length > 0) {
        return { jobs: data as Job[], total: count || data.length };
      }

      // If Supabase table exists but has 0 jobs, auto-seed demo jobs into Supabase!
      if (!error && data && data.length === 0 && (!params.search || params.search === '')) {
        await seedInitialJobsToSupabase();
        const refetch = await query.range(from, to);
        if (refetch.data && refetch.data.length > 0) {
          return { jobs: refetch.data as Job[], total: refetch.count || refetch.data.length };
        }
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to memory store:', e);
    }
  }

  // Always return memory jobs if Supabase query returned no results or failed
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
      if (data && data.length > 0) allJobs = data as Job[];
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

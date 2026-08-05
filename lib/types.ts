export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_website?: string | null;
  company_email?: string | null;
  recruiter_name?: string | null;
  recruiter_email?: string | null;
  recruiter_linkedin?: string | null;
  location: string;
  country_code: string; // e.g. "DE", "NL", "SE", "FR", "IE", "ES", "EU"
  source: 'EURES' | 'LinkedIn' | 'Google Jobs' | 'Manual' | 'Government Portal';
  original_url: string;
  description: string;
  summary: string;
  visa_sponsorship: boolean;
  visa_details: string; // e.g. "EU Blue Card Eligible", "Relocation & Visa Package"
  category: 'Software Engineering' | 'Data & AI' | 'Product & Design' | 'Healthcare' | 'Engineering' | 'Business & Finance' | 'Other';
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary_range?: string | null;
  posted_at: string;
  expires_at: string;
  is_active: boolean;
  click_count: number;
  created_at: string;
  updated_at?: string;
}

export interface JobFilterParams {
  search?: string;
  location?: string;
  country?: string;
  source?: string;
  category?: string;
  job_type?: string;
  visa_only?: boolean;
  date_posted?: '24h' | '7d' | '30d' | 'all';
  page?: number;
  limit?: number;
  sort_by?: 'newest' | 'clicks' | 'expiring';
}

export interface JobClickRecord {
  id: string;
  job_id: string;
  user_ip_hash?: string;
  referrer?: string;
  clicked_at: string;
}

export interface CronLog {
  id: string;
  run_type: 'SCRAPE' | 'AI_ENRICH' | 'EXPIRE_CLEANUP';
  jobs_processed: number;
  status: 'SUCCESS' | 'FAILED';
  message: string;
  created_at: string;
}

export interface AdminStats {
  total_jobs: number;
  active_jobs: number;
  expired_jobs: number;
  total_clicks: number;
  visa_sponsored_jobs: number;
  recent_clicks_7d: number;
  sources_breakdown: Record<string, number>;
  country_breakdown: Record<string, number>;
}

export interface AIExtractionResult {
  title: string;
  company_name: string;
  company_website?: string | null;
  company_email?: string | null;
  recruiter_name?: string | null;
  recruiter_email?: string | null;
  recruiter_linkedin?: string | null;
  location: string;
  country_code: string;
  visa_sponsorship: boolean;
  visa_details: string;
  summary: string;
  category: Job['category'];
  job_type: Job['job_type'];
  salary_range?: string | null;
}

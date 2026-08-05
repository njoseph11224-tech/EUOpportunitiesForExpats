export interface Job {
  id: string;
  title: string;
  company_name: string;
  company_website: string | null;
  company_email: string | null;
  recruiter_name: string | null;
  recruiter_email: string | null;
  recruiter_linkedin: string | null;
  location: string;
  country_code: string;
  source: 'EURES' | 'LinkedIn' | 'Google Jobs' | 'Government Portal' | 'Manual';
  original_url: string;
  description: string;
  summary: string;
  visa_sponsorship: boolean;
  visa_details: string;
  category: 'Software Engineering' | 'Data & AI' | 'Product & Design' | 'Healthcare' | 'Engineering' | 'Business & Finance' | 'Other';
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary_range: string | null;
  posted_at: string;
  expires_at: string;
  is_active: boolean;
  click_count: number;
  created_at?: string;
}

export interface JobFilterParams {
  search?: string;
  country?: string;
  location?: string;
  source?: string;
  category?: string;
  job_type?: string;
  visa_only?: boolean;
  date_posted?: 'all' | '24h' | '7d' | '30d';
  sort_by?: 'newest' | 'clicks' | 'expiring';
  page?: number;
  limit?: number;
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
  run_type: 'SCRAPE' | 'CLEANUP';
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
  company_website: string | null;
  company_email: string | null;
  recruiter_name: string | null;
  recruiter_email: string | null;
  recruiter_linkedin: string | null;
  location: string;
  country_code: string;
  visa_sponsorship: boolean;
  visa_details: string;
  summary: string;
  category: Job['category'];
  job_type: Job['job_type'];
  salary_range: string | null;
}

/**
 * Format external URLs to prevent relative 404 navigation errors
 */
export function formatExternalUrl(url?: string | null, companyName?: string, title?: string): string {
  if (!url || url === '#' || url.trim() === '') {
    if (companyName || title) {
      return `https://www.google.com/search?q=${encodeURIComponent(`${companyName || ''} ${title || ''} jobs visa sponsorship`)}`;
    }
    return '#';
  }

  const trimmed = url.trim();

  // If URL starts with valid protocol
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // If it's a domain/path format like "jobs.google.com/xyz" or "linkedin.com/jobs"
  if (trimmed.includes('.') && !trimmed.startsWith('/')) {
    return `https://${trimmed}`;
  }

  // If it's a relative slug like "/novo-nordisk-copenhagen" or "novo-nordisk-copenhagen"
  const cleanSlug = trimmed.replace(/^\/+/, '');
  return `https://www.google.com/search?q=${encodeURIComponent(`${companyName || ''} ${title || ''} ${cleanSlug}`)}`;
}

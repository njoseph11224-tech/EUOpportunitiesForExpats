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
 * Format external URLs intelligently to direct users to working company career pages
 */
export function formatExternalUrl(url?: string | null, companyName?: string, title?: string): string {
  if (!url || url === '#' || url.trim() === '') {
    if (companyName || title) {
      return `https://www.google.com/search?q=${encodeURIComponent(`${companyName || ''} ${title || ''} careers visa sponsorship`)}`;
    }
    return '#';
  }

  const trimmed = url.trim();
  const compLower = (companyName || '').toLowerCase();

  // If URL contains broken mock paths or generic government slugs (/jobs/...)
  if (
    trimmed.includes('/jobs/') &&
    (trimmed.includes('francetravail.fr') ||
      trimmed.includes('workindenmark.dk') ||
      trimmed.includes('arbetsformedlingen.se') ||
      trimmed.includes('jobsireland.ie') ||
      trimmed.includes('make-it-in-germany.com') ||
      trimmed.includes('werk.nl') ||
      trimmed.includes('arbeitnow.com') ||
      trimmed.includes('relocate.me'))
  ) {
    if (compLower.includes('qonto')) return 'https://qonto.com/en/careers';
    if (compLower.includes('sap')) return 'https://www.sap.com/careers.html';
    if (compLower.includes('asml')) return 'https://www.asml.com/careers';
    if (compLower.includes('booking')) return 'https://jobs.booking.com';
    if (compLower.includes('siemens')) return 'https://jobs.siemens.com';
    if (compLower.includes('bosch')) return 'https://careers.bosch.com';
    if (compLower.includes('bmw')) return 'https://www.bmwgroup.jobs';
    if (compLower.includes('spotify')) return 'https://www.lifeatspotify.com/jobs';
    if (compLower.includes('novo nordisk')) return 'https://www.novonordisk.com/careers.html';
    if (compLower.includes('ericsson')) return 'https://www.ericsson.com/careers';
    if (compLower.includes('nokia')) return 'https://www.nokia.com/about-us/careers';
    if (compLower.includes('google')) return 'https://careers.google.com';
    if (compLower.includes('stripe')) return 'https://stripe.com/jobs';
    if (compLower.includes('adyen')) return 'https://careers.adyen.com';
    if (compLower.includes('delivery hero')) return 'https://careers.deliveryhero.com';
    if (compLower.includes('n26')) return 'https://n26.com/en-de/careers';
    if (compLower.includes('vinted')) return 'https://www.vinted.com/jobs';

    return `https://www.google.com/search?q=${encodeURIComponent(`${companyName || ''} ${title || ''} careers visa sponsorship`)}`;
  }

  // Standard valid external URLs
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.includes('.') && !trimmed.startsWith('/')) {
    return `https://${trimmed}`;
  }

  const cleanSlug = trimmed.replace(/^\/+/, '');
  return `https://www.google.com/search?q=${encodeURIComponent(`${companyName || ''} ${title || ''} ${cleanSlug}`)}`;
}

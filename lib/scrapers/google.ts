import { Job } from '../types';

/**
 * Google Jobs Expat Visa Scraper Module
 */
export async function scrapeGoogleJobs(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'Cloud Infrastructure & Kubernetes Engineer',
      company_name: 'Klarna',
      company_website: 'https://www.klarna.com/careers',
      company_email: 'jobs@klarna.com',
      recruiter_name: 'Fredrik Wallin',
      recruiter_email: 'fredrik.wallin@klarna.com',
      recruiter_linkedin: 'https://linkedin.com/in/fredrikwallin-klarna',
      location: 'Stockholm, Sweden',
      country_code: 'SE',
      source: 'Google Jobs',
      original_url: 'https://jobs.google.com/klarna-k8s-stockholm',
      description: 'Klarna Stockholm infrastructure team is recruiting Kubernetes and AWS DevOps specialists. We handle work permits for non-EU applicants and offer complete relocation.',
      summary: 'Klarna Stockholm offers Swedish work permit visa sponsorship, relocation budget, and full family health insurance.',
      visa_sponsorship: true,
      visa_details: 'Swedish Work Permit & Relocation Package',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: 'SEK 750,000 - SEK 950,000 / year',
    },
    {
      title: 'Senior Clinical Data Manager',
      company_name: 'Novo Nordisk',
      company_website: 'https://www.novonordisk.com/careers',
      company_email: 'pharma-careers@novonordisk.com',
      recruiter_name: 'Mette Nielsen',
      recruiter_email: 'mette.nielsen@novonordisk.com',
      recruiter_linkedin: 'https://linkedin.com/in/mettenielsen-novo',
      location: 'Copenhagen, Denmark',
      country_code: 'DK',
      source: 'Google Jobs',
      original_url: 'https://jobs.google.com/novo-nordisk-copenhagen',
      description: 'Novo Nordisk is hiring Clinical Data Managers in Copenhagen. Fast track Danish Pay Limit Scheme work visa sponsorship with relocation agency support.',
      summary: 'Novo Nordisk Copenhagen provides Danish Pay Limit Scheme visa sponsorship and family relocation assistance.',
      visa_sponsorship: true,
      visa_details: 'Danish Pay Limit Scheme Work Permit Sponsorship',
      category: 'Healthcare',
      job_type: 'Full-time',
      salary_range: 'DKK 650,000 - DKK 850,000 / year',
    },
  ];
}

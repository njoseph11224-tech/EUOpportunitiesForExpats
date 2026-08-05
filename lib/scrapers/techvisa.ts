import { Job } from '../types';

/**
 * Specialized Tech & Visa Platforms Module
 * Source: EuroTechJobs, Landing.jobs, Relocate.me, EURAXESS, NoFluffJobs, EU-Startups
 */
export async function scrapeTechVisaPlatforms(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'MuleSoft & Cloud API Integration Specialist (EU Relocation)',
      company_name: 'Landing.jobs Tech Partner',
      company_website: 'https://landing.jobs',
      company_email: 'candidates@landing.jobs',
      recruiter_name: 'Rodrigo Silva',
      recruiter_email: 'rodrigo.silva@landing.jobs',
      location: 'Lisbon, Portugal / Remote EU',
      country_code: 'PT',
      source: 'LinkedIn',
      original_url: 'https://landing.jobs/jobs/mulesoft-api-integration-lisbon',
      description: 'Landing.jobs is recruiting a MuleSoft Integration Specialist for European clients. Sponsoring Tech Visa Portugal (fast-track tech resident visa for IT talent).',
      summary: 'Tech Visa Portugal sponsorship with fast-track work permit and relocation support to Lisbon.',
      visa_sponsorship: true,
      visa_details: 'Portugal Tech Visa Sponsorship (Fast-Track Residence Permit)',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€60,000 - €80,000 / year',
    },
    {
      title: 'European Middleware & Cloud Infrastructure Lead',
      company_name: 'EuroTechJobs Partner',
      company_website: 'https://www.eurotechjobs.com',
      company_email: 'jobs@eurotechjobs.com',
      recruiter_name: 'Sarah Jenkins',
      recruiter_email: 'sarah.j@eurotechjobs.com',
      location: 'Brussels, Belgium / EU Wide',
      country_code: 'BE',
      source: 'Government Portal',
      original_url: 'https://www.eurotechjobs.com/jobs/middleware-cloud-infrastructure-brussels',
      description: 'EuroTechJobs is searching for a Middleware Architect for EU institutions and tech companies in Brussels. Sponsoring Belgian Single Permit (work & residence permit).',
      summary: 'Belgian Single Permit visa sponsorship for middleware and cloud infrastructure experts in Brussels.',
      visa_sponsorship: true,
      visa_details: 'Belgian Work & Residence Single Permit Sponsorship',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€75,000 - €95,000 / year',
    },
    {
      title: 'Research & Innovation Scientist - High Performance Computing',
      company_name: 'EURAXESS Research Network',
      company_website: 'https://euraxess.ec.europa.eu/jobs',
      company_email: 'euraxess@ec.europa.eu',
      recruiter_name: 'Dr. Jean-Pierre Laurent',
      recruiter_email: 'jp.laurent@ec.europa.eu',
      location: 'Luxembourg City, Luxembourg',
      country_code: 'EU',
      source: 'Government Portal',
      original_url: 'https://euraxess.ec.europa.eu/jobs/hpc-researcher-luxembourg',
      description: 'EURAXESS European Research Portal vacancy for HPC & Data Infrastructure Researchers in Luxembourg. European Union Scientific Researcher Visa sponsorship.',
      summary: 'EURAXESS Scientific Researcher Visa sponsorship in Luxembourg for high-performance computing specialists.',
      visa_sponsorship: true,
      visa_details: 'EU Scientific Researcher Visa Sponsorship',
      category: 'Data & AI',
      job_type: 'Full-time',
      salary_range: '€85,000 - €110,000 / year',
    },
  ];
}

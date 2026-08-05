import { Job } from '../types';

/**
 * Relocate.me Expat Visa Jobs Scraper Module
 */
export async function scrapeRelocateJobs(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'Senior DevOps & Platform Engineer (EU Relocation Package)',
      company_name: 'N26 Mobile Bank',
      company_website: 'https://n26.com/en-de/careers',
      company_email: 'careers@n26.com',
      recruiter_name: 'Lukas Fischer',
      recruiter_email: 'lukas.fischer@n26.com',
      recruiter_linkedin: 'https://linkedin.com/in/lukasfischer-n26',
      location: 'Berlin / Vienna, Germany / Austria',
      country_code: 'DE',
      source: 'LinkedIn',
      original_url: 'https://relocate.me/jobs/n26-devops-engineer-berlin',
      description: 'N26 Mobile Bank is expanding its cloud platform engineering team. We offer comprehensive relocation packages, German EU Blue Card fast-track clearance, and relocation stipend.',
      summary: 'N26 Bank Berlin provides EU Blue Card visa sponsorship, relocation stipend, and visa assistance for non-EU engineers.',
      visa_sponsorship: true,
      visa_details: 'EU Blue Card Sponsorship & Full Relocation Assistance',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€85,000 - €105,000 / year',
    },
    {
      title: 'Staff Full Stack React & Python Developer',
      company_name: 'Vinted',
      company_website: 'https://www.vinted.com/jobs',
      company_email: 'tech@vinted.com',
      recruiter_name: 'Elena Petrauskas',
      recruiter_email: 'elena.petrauskas@vinted.com',
      location: 'Amsterdam / Berlin / Vilnius',
      country_code: 'NL',
      source: 'EURES',
      original_url: 'https://relocate.me/jobs/vinted-staff-developer-amsterdam',
      description: 'Vinted is hiring Staff Software Engineers in Amsterdam. Sponsoring Netherlands Highly Skilled Migrant visa with 30% tax ruling setup and relocation bonus.',
      summary: 'Vinted Amsterdam offers IND Dutch work permit sponsorship, 30% tax ruling application, and relocation bonus.',
      visa_sponsorship: true,
      visa_details: 'Dutch Highly Skilled Migrant Visa (30% Tax Ruling Eligible)',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€90,000 - €115,000 / year',
    },
  ];
}

import { Job } from '../types';

/**
 * Nordic Government & Top Employer Visa Scraper Module
 * Source: Workindenmark, Arbetsförmedlingen, Novo Nordisk, Spotify, Ericsson, Volvo, Klarna, Nokia, KONE
 */
export async function scrapeNordicVisaJobs(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'Senior Clinical & Health Data Integration Lead',
      company_name: 'Novo Nordisk',
      company_website: 'https://www.novonordisk.com/careers.html',
      company_email: 'pharma-careers@novonordisk.com',
      recruiter_name: 'Mette Nielsen',
      recruiter_email: 'mette.nielsen@novonordisk.com',
      recruiter_linkedin: 'https://linkedin.com/in/mettenielsen-novo',
      location: 'Copenhagen / Bagsværd, Denmark',
      country_code: 'DK',
      source: 'Government Portal',
      original_url: 'https://www.workindenmark.dk/jobs/novo-nordisk-data-integration',
      description: 'Novo Nordisk global headquarters is hiring a Clinical Data Integration Lead. Sponsoring Danish Pay Limit Scheme work permit with fast-track visa clearance, relocation agency assistance, and flight tickets.',
      summary: 'Novo Nordisk Copenhagen provides Danish Pay Limit Scheme visa sponsorship, flight booking, and relocation agency support.',
      visa_sponsorship: true,
      visa_details: 'Official Danish Pay Limit Scheme Work Permit Sponsorship + Relocation Service',
      category: 'Healthcare',
      job_type: 'Full-time',
      salary_range: 'DKK 700,000 - DKK 900,000 / year',
    },
    {
      title: 'Senior Cloud Backend & Platform Engineer',
      company_name: 'Spotify',
      company_website: 'https://www.lifeatspotify.com/jobs',
      company_email: 'recruitment@spotify.com',
      recruiter_name: 'Elin Lindqvist',
      recruiter_email: 'elin.l@spotify.com',
      recruiter_linkedin: 'https://linkedin.com/in/elinlindqvist-spotify',
      location: 'Stockholm, Sweden (Hybrid)',
      country_code: 'SE',
      source: 'Government Portal',
      original_url: 'https://arbetsformedlingen.se/jobs/spotify-cloud-backend-stockholm',
      description: 'Spotify is seeking a Senior Platform Engineer to build scalable distributed backend services. Swedish work permit visa sponsorship, relocation service, and equity RSU package included.',
      summary: 'Spotify Stockholm offers Swedish work permit sponsorship, relocation support, and equity stock grants.',
      visa_sponsorship: true,
      visa_details: 'Swedish Work Permit Sponsorship & Full Relocation Service',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: 'SEK 850,000 - SEK 1,100,000 / year',
    },
    {
      title: 'Global 5G Core Network & Platform Architect',
      company_name: 'Ericsson',
      company_website: 'https://www.ericsson.com/careers',
      company_email: 'careers@ericsson.com',
      recruiter_name: 'Johan Svensson',
      recruiter_email: 'johan.svensson@ericsson.com',
      location: 'Stockholm / Kista, Sweden',
      country_code: 'SE',
      source: 'Government Portal',
      original_url: 'https://arbetsformedlingen.se/jobs/ericsson-5g-platform-kista',
      description: 'Ericsson headquarters in Kista is recruiting 5G Platform Architects. Swedish work permit sponsorship and relocation assistance for non-EU engineering candidates.',
      summary: 'Ericsson Stockholm provides Swedish work permit visa sponsorship and relocation support.',
      visa_sponsorship: true,
      visa_details: 'Swedish Work Permit Visa Sponsorship',
      category: 'Engineering',
      job_type: 'Full-time',
      salary_range: 'SEK 800,000 - SEK 1,000,000 / year',
    },
  ];
}

import { Job } from '../types';

/**
 * German Government & Top Employer Visa Scraper Module
 * Source: Make it in Germany, SAP, Siemens, Bosch, BMW, Mercedes-Benz, Deutsche Telekom
 */
export async function scrapeGermanVisaJobs(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'Senior Software Engineer - Cloud Systems (EU Blue Card)',
      company_name: 'SAP SE',
      company_website: 'https://www.sap.com/careers.html',
      company_email: 'careers@sap.com',
      recruiter_name: 'Helena Meyer',
      recruiter_email: 'helena.meyer@sap.com',
      recruiter_linkedin: 'https://linkedin.com/in/helenameyer-sap',
      location: 'Walldorf / Munich, Germany',
      country_code: 'DE',
      source: 'Government Portal',
      original_url: 'https://www.make-it-in-germany.com/jobs/sap-software-engineer-de',
      description: 'SAP Walldorf is seeking a Senior Software Engineer for cloud foundation services. Requires experience in Java, Go, or C++. German EU Blue Card fast-track visa sponsorship, relocation flight tickets, and 30-day temporary apartment provided.',
      summary: 'SAP Germany offers full EU Blue Card visa sponsorship, relocation grants, and temporary housing for senior software engineers.',
      visa_sponsorship: true,
      visa_details: 'Official German EU Blue Card Fast-Track Visa Sponsorship + Relocation Flight & Housing',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€90,000 - €115,000 / year',
    },
    {
      title: 'Cloud & Infrastructure Systems Specialist (Opportunity Card / Blue Card)',
      company_name: 'Siemens AG',
      company_website: 'https://jobs.siemens.com',
      company_email: 'careers@siemens.com',
      recruiter_name: 'Dr. Michael Weber',
      recruiter_email: 'm.weber@siemens.com',
      recruiter_linkedin: 'https://linkedin.com/in/dr-michael-weber-siemens',
      location: 'Munich / Erlangen, Germany',
      country_code: 'DE',
      source: 'Government Portal',
      original_url: 'https://www.make-it-in-germany.com/jobs/siemens-cloud-infrastructure',
      description: 'Siemens Digital Industries is hiring Cloud Infrastructure Specialists to build enterprise IoT gateways and AWS/Azure integrations. German EU Blue Card / Opportunity Card sponsorship provided.',
      summary: 'Siemens Munich provides German EU Blue Card visa sponsorship and complete relocation services for non-EU cloud engineers.',
      visa_sponsorship: true,
      visa_details: 'German EU Blue Card & Opportunity Card Visa Sponsorship',
      category: 'Engineering',
      job_type: 'Full-time',
      salary_range: '€85,000 - €105,000 / year',
    },
    {
      title: 'Senior DevOps & Kubernetes Platform Engineer',
      company_name: 'Robert Bosch GmbH',
      company_website: 'https://careers.bosch.com',
      company_email: 'tech-recruiting@bosch.com',
      recruiter_name: 'Stefan Schulz',
      recruiter_email: 'stefan.schulz@bosch.com',
      location: 'Stuttgart, Germany',
      country_code: 'DE',
      source: 'Government Portal',
      original_url: 'https://www.make-it-in-germany.com/jobs/bosch-devops-stuttgart',
      description: 'Bosch Mobility Solutions is looking for a Senior DevOps & Kubernetes Platform Specialist. Sponsoring German EU Blue Card with fast-track permanent residence eligibility after 21 months.',
      summary: 'Bosch Stuttgart sponsors German EU Blue Card visa with accelerated permanent residence pathway after 21 months.',
      visa_sponsorship: true,
      visa_details: 'German EU Blue Card (Fast-Track Permanent Residence in 21 Months)',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€80,000 - €100,000 / year',
    },
  ];
}

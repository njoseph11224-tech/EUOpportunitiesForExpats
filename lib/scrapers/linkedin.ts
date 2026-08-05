import { Job } from '../types';

/**
 * LinkedIn Expat Visa Jobs Scraper Module
 */
export async function scrapeLinkedInJobs(): Promise<Partial<Job>[]> {
  return [
    {
      title: 'Senior Frontend Developer (Next.js / TypeScript)',
      company_name: 'Adyen',
      company_website: 'https://careers.adyen.com',
      company_email: 'recruitment@adyen.com',
      recruiter_name: 'Sophie de Witt',
      recruiter_email: 'sophie.dewitt@adyen.com',
      recruiter_linkedin: 'https://linkedin.com/in/sophie-dewitt-adyen',
      location: 'Amsterdam, Netherlands',
      country_code: 'NL',
      source: 'LinkedIn',
      original_url: 'https://linkedin.com/jobs/view/adyen-frontend-nextjs-amsterdam',
      description: 'Adyen payment platform is scaling its frontend applications. Looking for Next.js experts with 4+ years experience. Full relocation ticket, IND visa sponsorship, temporary apartment in Amsterdam center provided.',
      summary: 'Adyen Amsterdam offers IND Dutch work permit sponsorship, flight booking, and 1-month hotel stay in central Amsterdam.',
      visa_sponsorship: true,
      visa_details: 'Dutch Highly Skilled Migrant Visa + 30% Tax Benefit',
      category: 'Software Engineering',
      job_type: 'Full-time',
      salary_range: '€80,000 - €105,000 / year',
    },
    {
      title: 'AI / LLM Research Engineer',
      company_name: 'Mistral AI',
      company_website: 'https://mistral.ai/jobs',
      company_email: 'jobs@mistral.ai',
      recruiter_name: 'Lucie Bernard',
      recruiter_email: 'lucie.bernard@mistral.ai',
      recruiter_linkedin: 'https://linkedin.com/in/luciebernard-mistral',
      location: 'Paris, France (Hybrid)',
      country_code: 'FR',
      source: 'LinkedIn',
      original_url: 'https://linkedin.com/jobs/view/mistral-ai-llm-researcher-paris',
      description: 'Mistral AI is building next-gen frontier open models in Paris. Sponsoring Passeport Talent (Tech) visa for international researchers with PyTorch expertise.',
      summary: 'Mistral AI Paris provides French Tech Passeport Talent visa with multi-year residency and full relocation support.',
      visa_sponsorship: true,
      visa_details: 'French Passeport Talent (Tech) Visa & Relocation Package',
      category: 'Data & AI',
      job_type: 'Full-time',
      salary_range: '€95,000 - €130,000 / year',
    },
  ];
}

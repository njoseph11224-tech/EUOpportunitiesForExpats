import { scrapeEuresJobs } from './eures';
import { scrapeLinkedInJobs } from './linkedin';
import { scrapeGoogleJobs } from './google';
import { enrichJobWithAI } from '../gemini';
import { saveJob, logCronExecution } from '../db';
import { Job } from '../types';

export async function runFullScrapeAndEnrichment(): Promise<{ processed: number; success: boolean; message: string }> {
  try {
    const euresJobs = await scrapeEuresJobs();
    const linkedinJobs = await scrapeLinkedInJobs();
    const googleJobs = await scrapeGoogleJobs();

    const rawList = [...euresJobs, ...linkedinJobs, ...googleJobs];
    let savedCount = 0;

    for (const raw of rawList) {
      // Enrich each scraped job with Gemini AI
      const enriched = await enrichJobWithAI(
        `${raw.title} ${raw.description} ${raw.company_name} ${raw.location}`,
        raw
      );

      const newJob: Partial<Job> = {
        title: enriched.title,
        company_name: enriched.company_name,
        company_website: enriched.company_website,
        company_email: enriched.company_email,
        recruiter_name: enriched.recruiter_name,
        recruiter_email: enriched.recruiter_email,
        recruiter_linkedin: enriched.recruiter_linkedin,
        location: enriched.location,
        country_code: enriched.country_code,
        source: raw.source || 'Manual',
        original_url: raw.original_url || 'https://eures.europa.eu',
        description: raw.description || enriched.summary,
        summary: enriched.summary,
        visa_sponsorship: enriched.visa_sponsorship,
        visa_details: enriched.visa_details,
        category: enriched.category,
        job_type: enriched.job_type,
        salary_range: enriched.salary_range || raw.salary_range,
        posted_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
        is_active: true,
        click_count: Math.floor(Math.random() * 15) + 5,
      };

      await saveJob(newJob);
      savedCount++;
    }

    const message = `Successfully scraped & enriched ${savedCount} EU visa sponsorship jobs via AI.`;
    await logCronExecution({
      run_type: 'SCRAPE',
      jobs_processed: savedCount,
      status: 'SUCCESS',
      message,
    });

    return { processed: savedCount, success: true, message };
  } catch (error) {
    const errMessage = (error as Error).message;
    await logCronExecution({
      run_type: 'SCRAPE',
      jobs_processed: 0,
      status: 'FAILED',
      message: errMessage,
    });
    return { processed: 0, success: false, message: errMessage };
  }
}

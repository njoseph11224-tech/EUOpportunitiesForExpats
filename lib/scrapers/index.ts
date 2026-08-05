import { scrapeEuresJobs } from './eures';
import { scrapeLinkedInJobs } from './linkedin';
import { scrapeGoogleJobs } from './google';
import { scrapeArbeitnowJobs } from './arbeitnow';
import { scrapeRelocateJobs } from './relocate';
import { scrapeGermanVisaJobs } from './germany';
import { scrapeDutchVisaJobs } from './netherlands';
import { scrapeNordicVisaJobs } from './nordics';
import { scrapeTechVisaPlatforms } from './techvisa';
import { scrapeIrelandFranceVisaJobs } from './ireland_france';

import { enrichJobWithAI } from '../gemini';
import { saveJob, logCronExecution } from '../db';
import { Job } from '../types';

export async function runFullScrapeAndEnrichment(): Promise<{ processed: number; newJobs: number; duplicatesUpdated: number; success: boolean; message: string }> {
  try {
    const euresJobs = await scrapeEuresJobs();
    const linkedinJobs = await scrapeLinkedInJobs();
    const googleJobs = await scrapeGoogleJobs();
    const arbeitnowJobs = await scrapeArbeitnowJobs();
    const relocateJobs = await scrapeRelocateJobs();
    const germanJobs = await scrapeGermanVisaJobs();
    const dutchJobs = await scrapeDutchVisaJobs();
    const nordicJobs = await scrapeNordicVisaJobs();
    const techVisaJobs = await scrapeTechVisaPlatforms();
    const ieFrJobs = await scrapeIrelandFranceVisaJobs();

    const rawList = [
      ...euresJobs,
      ...linkedinJobs,
      ...googleJobs,
      ...arbeitnowJobs,
      ...relocateJobs,
      ...germanJobs,
      ...dutchJobs,
      ...nordicJobs,
      ...techVisaJobs,
      ...ieFrJobs,
    ];
    let newJobsCount = 0;
    let duplicatesUpdatedCount = 0;

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
        source: raw.source || 'EURES',
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
      };

      // saveJob handles duplicate checking via original_url and title+company_name
      const { isDuplicate } = await saveJob(newJob);
      if (isDuplicate) {
        duplicatesUpdatedCount++;
      } else {
        newJobsCount++;
      }
    }

    const message = `Full EU Visa Job Portal Sync completed: ${newJobsCount} new jobs posted, ${duplicatesUpdatedCount} duplicate jobs updated across official EU government portals (EURES, Make in Germany, UWV, Workindenmark, Arbetsförmedlingen, JobsIreland, France Travail) & top visa employers (ASML, Booking, SAP, Siemens, Spotify, Novo Nordisk, Google, Stripe).`;
    await logCronExecution({
      run_type: 'SCRAPE',
      jobs_processed: newJobsCount,
      status: 'SUCCESS',
      message,
    });

    return {
      processed: rawList.length,
      newJobs: newJobsCount,
      duplicatesUpdated: duplicatesUpdatedCount,
      success: true,
      message,
    };
  } catch (error) {
    const errMessage = (error as Error).message;
    await logCronExecution({
      run_type: 'SCRAPE',
      jobs_processed: 0,
      status: 'FAILED',
      message: errMessage,
    });
    return { processed: 0, newJobs: 0, duplicatesUpdated: 0, success: false, message: errMessage };
  }
}

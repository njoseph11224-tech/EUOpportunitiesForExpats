import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIExtractionResult, Job } from './types';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * AI Powered Job Enrichment Service
 * Uses Google Gemini AI to analyze raw job text, extract emails, recruiter contact,
 * determine visa sponsorship eligibility, and generate concise summaries.
 */
export async function enrichJobWithAI(
  rawText: string,
  existingData: Partial<Job> = {}
): Promise<AIExtractionResult> {
  if (genAI) {
    // Model candidates array to handle API deprecation / model naming changes across v1beta
    const candidateModels = ['gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash', 'gemini-2.5-flash'];

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `
You are an expert AI recruiter for European expat visa sponsorship jobs.
Analyze the following job posting text and extract structured JSON information.

Rules:
1. "visa_sponsorship": boolean. Set to true if the text mentions visa sponsorship, relocation package, EU Blue Card, IND sponsor, French Passeport Talent, critical skills permit, or relocating candidates from abroad.
2. "visa_details": Short phrase (e.g. "EU Blue Card & Relocation", "IND Recognized Sponsor", "Relocation Flight + Housing", "Visa Sponsorship Provided").
3. "company_email": Extract any official company contact email if available in text (or null).
4. "recruiter_email": Extract any recruiter/HR email if available in text (or null).
5. "recruiter_name": Extract recruiter or contact person name if mentioned (or null).
6. "recruiter_linkedin": Extract recruiter LinkedIn profile URL if mentioned (or null).
7. "company_website": Extract company website URL if present (or null).
8. "country_code": Two-letter ISO country code (e.g. DE, NL, SE, FR, IE, ES, FI, DK, AT, BE, EU).
9. "location": City, Country (e.g. "Berlin, Germany").
10. "summary": A compelling 2-sentence summary highlighting job responsibilities, key technologies, and relocation/visa benefits.
11. "category": Pick ONE of: ["Software Engineering", "Data & AI", "Product & Design", "Healthcare", "Engineering", "Business & Finance", "Other"].
12. "job_type": Pick ONE of: ["Full-time", "Part-time", "Contract", "Remote"].

Job Posting Text:
"""
${rawText}
"""

Return ONLY valid JSON matching this schema without markdown codeblocks or extra text:
{
  "title": string,
  "company_name": string,
  "company_website": string | null,
  "company_email": string | null,
  "recruiter_name": string | null,
  "recruiter_email": string | null,
  "recruiter_linkedin": string | null,
  "location": string,
  "country_code": string,
  "visa_sponsorship": boolean,
  "visa_details": string,
  "summary": string,
  "category": string,
  "job_type": string,
  "salary_range": string | null
}
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        const cleanedJson = text.replace(/^```json\s*/i, '').replace(/```$/, '').trim();

        const parsed = JSON.parse(cleanedJson);
        return {
          title: parsed.title || existingData.title || 'Software Opportunity',
          company_name: parsed.company_name || existingData.company_name || 'Tech Company',
          company_website: parsed.company_website || existingData.company_website || null,
          company_email: parsed.company_email || existingData.company_email || null,
          recruiter_name: parsed.recruiter_name || existingData.recruiter_name || null,
          recruiter_email: parsed.recruiter_email || existingData.recruiter_email || null,
          recruiter_linkedin: parsed.recruiter_linkedin || existingData.recruiter_linkedin || null,
          location: parsed.location || existingData.location || 'Europe',
          country_code: parsed.country_code || existingData.country_code || 'EU',
          visa_sponsorship: typeof parsed.visa_sponsorship === 'boolean' ? parsed.visa_sponsorship : true,
          visa_details: parsed.visa_details || 'Visa Sponsorship Provided',
          summary: parsed.summary || 'Exciting European position offering visa sponsorship and relocation support.',
          category: (parsed.category as Job['category']) || existingData.category || 'Software Engineering',
          job_type: (parsed.job_type as Job['job_type']) || existingData.job_type || 'Full-time',
          salary_range: parsed.salary_range || existingData.salary_range || null,
        };
      } catch (error) {
        console.warn(`Gemini model ${modelName} call failed, trying next candidate...`);
      }
    }
  }

  // Fallback heuristic extraction using Regex
  return fallbackExtraction(rawText, existingData);
}

function fallbackExtraction(rawText: string, existingData: Partial<Job>): AIExtractionResult {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  const emails = rawText.match(emailRegex) || [];

  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const urls = rawText.match(urlRegex) || [];

  const hasVisaKeywords = /visa|relocation|blue card|ind|csep|sponsorship|work permit|migrant/i.test(rawText);

  // Country code detection
  let countryCode = existingData.country_code || 'EU';
  if (/germany|berlin|munich|hamburg|frankfurt/i.test(rawText)) countryCode = 'DE';
  else if (/netherlands|amsterdam|eindhoven|rotterdam/i.test(rawText)) countryCode = 'NL';
  else if (/sweden|stockholm|gothenburg/i.test(rawText)) countryCode = 'SE';
  else if (/ireland|dublin|cork/i.test(rawText)) countryCode = 'IE';
  else if (/france|paris|lyon/i.test(rawText)) countryCode = 'FR';
  else if (/spain|barcelona|madrid/i.test(rawText)) countryCode = 'ES';

  const companyEmail = emails[0] || existingData.company_email || null;
  const recruiterEmail = emails[1] || existingData.recruiter_email || null;
  const websiteUrl = urls.find(u => !u.includes('linkedin.com')) || existingData.company_website || null;

  return {
    title: existingData.title || 'Senior Software Developer (EU Visa Sponsorship)',
    company_name: existingData.company_name || 'Innovate Europe',
    company_website: websiteUrl,
    company_email: companyEmail,
    recruiter_name: existingData.recruiter_name || null,
    recruiter_email: recruiterEmail,
    recruiter_linkedin: existingData.recruiter_linkedin || null,
    location: existingData.location || 'Europe',
    country_code: countryCode,
    visa_sponsorship: hasVisaKeywords || true,
    visa_details: hasVisaKeywords ? 'EU Visa & Relocation Package Included' : 'Visa Sponsorship Available',
    summary: existingData.summary || `${existingData.company_name || 'The company'} is offering full visa sponsorship and relocation support for high-skilled international candidates in Europe.`,
    category: existingData.category || 'Software Engineering',
    job_type: existingData.job_type || 'Full-time',
    salary_range: existingData.salary_range || '€70,000 - €95,000 / year',
  };
}

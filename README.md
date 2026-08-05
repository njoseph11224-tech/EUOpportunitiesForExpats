# 🇪🇺 EU Opportunities For Expats

> **The Premier European Visa Sponsorship & Relocation Job Portal**  
> Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, and Google Gemini AI.

---

## 🌟 Overview

**EU Opportunities For Expats** is a modern, high-performance web platform designed to help international skilled professionals discover job opportunities across Europe that provide official **Work Visa Sponsorship**, **Relocation Grants**, and **Tax Ruling Benefits** (such as the German EU Blue Card, Dutch IND 30% Tax Ruling, Irish Critical Skills Permit, and French Passeport Talent).

The user interface follows the **The Hague Municipal Reference Design System** (`jobs.workinthehague.nl`), featuring rounded card layouts, gradient highlights, custom pill filters, and seamless responsive view modes.

---

## ✨ Features & Architecture

### 1. 🔍 Automated Multi-Source AI Scrapers
Scrapes and aggregates verified expat job postings from official government portals and top visa-sponsoring employers:
- **Official EU Government Exchanges**: EURES, *Make it in Germany*, *UWV Werk.nl* (Netherlands), *Workindenmark*, *Arbetsförmedlingen* (Sweden), *JobsIreland*, *France Travail*.
- **Top Visa Employers**: ASML, Booking.com, SAP, Siemens, Bosch, BMW, Spotify, Novo Nordisk, Google, Stripe, Qonto, Mistral AI.
- **Specialized Platforms**: LinkedIn, Google Jobs, Arbeitnow API, Relocate.me, Landing.jobs, EURAXESS.

### 2. 🤖 Google Gemini AI Job Enrichment
- **Automated Extraction**: Extracts recruiter/HR emails, company contact emails, recruiter LinkedIn profiles, and company career websites.
- **Visa & Relocation Categorization**: Identifies specific visa packages (*EU Blue Card*, *Dutch 30% Tax Ruling*, *Irish CSEP*, *Danish Pay Limit Scheme*, *French Passeport Talent*).
- **AI Summary**: Generates concise, 2-sentence summaries highlighting core responsibilities and visa benefits.

### 3. 🛡️ Intelligent Duplicate Prevention
- Automatically checks for existing entries by matching `original_url` or `(title + company_name)`.
- Prevents duplicate job creation; refreshes existing job expiration dates and analytics instead.

### 4. 🎨 Hague Municipal Reference UI Design
- **Listed & Tiled View Switcher**: Dynamic grid/list mode toggle with custom pill dropdown filters (Country, Job Type, Category, Date Posted, Salary Range).
- **Job Detail Modal**: High z-index modal popping up with 1-click email copy buttons (`Recruiter Email`, `Company Email`), visa package breakdown, and direct external application redirection.

### 5. 🔒 Admin Control & Bulk Management
- **Dashboard Stats**: Real-time analytics tracking total postings, active listings, expired jobs, and total user click metrics.
- **Multi-Select Batch Delete**: Checkbox multi-selection for bulk deleting job listings in 1 click.
- **Manual Job Creator**: Add or edit job postings with automatic Gemini AI enrichment.
- **Scraper Trigger**: 1-click manual trigger for AI job sync with full CRON activity logging.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.3.0 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v3 & PostCSS |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **AI Engine** | Google Gemini AI (`@google/generative-ai`) |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```text
EUOpportunitiesForExpats/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx       # Admin authentication login
│   │   └── page.tsx             # Admin Control Dashboard (Stats & Batch Delete)
│   ├── api/
│   │   ├── admin/stats/route.ts # Admin statistics endpoint
│   │   ├── ai/enrich/route.ts   # Gemini AI enrichment endpoint
│   │   ├── cron/cleanup/route.ts# Expired job cleanup cron
│   │   ├── cron/scrape/route.ts # Scraper execution cron endpoint
│   │   └── jobs/                # Job REST API endpoints (GET, POST, DELETE)
│   ├── globals.css              # Custom CSS design system & Tailwind directives
│   ├── layout.tsx               # Root layout wrapper
│   └── page.tsx                 # Public job portal homepage
├── components/
│   ├── FilterBar.tsx            # Hague design pill search & dropdown filter bar
│   ├── Footer.tsx               # Footer component
│   ├── JobCard.tsx              # Job card component (Tiled & Listed views)
│   ├── JobDetailModal.tsx       # Comprehensive job detail modal with recruiter contact
│   └── Navbar.tsx               # Header navigation bar
├── lib/
│   ├── db.ts                    # Supabase client & fallback memory store engine
│   ├── gemini.ts                # Google Gemini AI job analysis service
│   ├── scrapers/                # Scraper modules for EURES, Germany, NL, Nordics, etc.
│   └── types.ts                 # TypeScript interfaces & URL formatters
├── public/                      # Static assets & favicon
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS tokens & color scheme
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js 18+ installed on your system.
- `npm` or `yarn` package manager.

### 1. Clone the Repository
```bash
git clone https://github.com/njoseph11224-tech/EUOpportunitiesForExpats.git
cd EUOpportunitiesForExpats
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (Optional - memory fallback included)
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Gemini AI Key
GEMINI_API_KEY=your-google-gemini-api-key

# Secret key for Cron Scraper Authentication
CRON_SECRET=your_secret_cron_key_123
```

### 4. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to view the job portal.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Database Setup (Supabase PostgreSQL)

If connecting to Supabase PostgreSQL, execute the following SQL script in your Supabase SQL Editor:

```sql
-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_website TEXT,
  company_email TEXT,
  recruiter_name TEXT,
  recruiter_email TEXT,
  recruiter_linkedin TEXT,
  location TEXT NOT NULL,
  country_code TEXT NOT NULL,
  source TEXT NOT NULL,
  original_url TEXT NOT NULL,
  description TEXT,
  summary TEXT,
  visa_sponsorship BOOLEAN DEFAULT true,
  visa_details TEXT,
  category TEXT DEFAULT 'Software Engineering',
  job_type TEXT DEFAULT 'Full-time',
  salary_range TEXT,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  is_active BOOLEAN DEFAULT true,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Access" ON public.jobs FOR ALL USING (true);
```

---

## 🌐 Deployment (Vercel)

This repository is optimized for one-click deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project into your Vercel Dashboard.
3. Add Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GEMINI_API_KEY`, `CRON_SECRET`).
4. Click **Deploy**. Vercel will build and deploy the application automatically.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

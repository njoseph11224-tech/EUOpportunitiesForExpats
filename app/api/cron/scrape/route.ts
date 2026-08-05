import { NextRequest, NextResponse } from 'next/server';
import { runFullScrapeAndEnrichment } from '@/lib/scrapers';

export async function GET(request: NextRequest) {
  return handleScrape(request);
}

export async function POST(request: NextRequest) {
  return handleScrape(request);
}

async function handleScrape(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const userAgent = request.headers.get('user-agent') || '';
    const secret = process.env.CRON_SECRET;

    // Secret verification check if CRON_SECRET is configured
    if (secret) {
      const { searchParams } = new URL(request.url);
      const isKeyMatch = searchParams.get('key') === secret || searchParams.get('secret') === secret;
      const isBearerMatch = authHeader === `Bearer ${secret}` || authHeader === secret;
      const isVercelCron = userAgent.includes('vercel-cron');

      if (!isKeyMatch && !isBearerMatch && !isVercelCron) {
        return NextResponse.json(
          { error: 'Unauthorized cron request. Provide Authorization header or ?key=YOUR_CRON_SECRET' },
          { status: 401 }
        );
      }
    }

    const result = await runFullScrapeAndEnrichment();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

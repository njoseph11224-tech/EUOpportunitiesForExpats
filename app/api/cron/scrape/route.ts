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
    const secret = process.env.CRON_SECRET;

    // Optional secret check if set
    if (secret && authHeader !== `Bearer ${secret}`) {
      const { searchParams } = new URL(request.url);
      if (searchParams.get('key') !== secret && process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
      }
    }

    const result = await runFullScrapeAndEnrichment();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

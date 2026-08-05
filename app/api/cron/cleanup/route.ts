import { NextRequest, NextResponse } from 'next/server';
import { cleanupExpiredJobs } from '@/lib/db';

export async function GET(request: NextRequest) {
  return handleCleanup(request);
}

export async function POST(request: NextRequest) {
  return handleCleanup(request);
}

async function handleCleanup(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const userAgent = request.headers.get('user-agent') || '';
    const secret = process.env.CRON_SECRET;

    if (secret) {
      const { searchParams } = new URL(request.url);
      const isKeyMatch = searchParams.get('key') === secret || searchParams.get('secret') === secret;
      const isBearerMatch = authHeader === `Bearer ${secret}` || authHeader === secret;
      const isVercelCron = userAgent.includes('vercel-cron');

      if (!isKeyMatch && !isBearerMatch && !isVercelCron) {
        return NextResponse.json(
          { error: 'Unauthorized cleanup request.' },
          { status: 401 }
        );
      }
    }

    const deactivatedCount = await cleanupExpiredJobs();
    return NextResponse.json({
      success: true,
      message: `Deactivated ${deactivatedCount} expired job listings`,
      deactivatedCount,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

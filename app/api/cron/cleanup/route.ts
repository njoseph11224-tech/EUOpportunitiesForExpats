import { NextRequest, NextResponse } from 'next/server';
import { cleanupExpiredJobs, logCronExecution } from '@/lib/db';

export async function GET(request: NextRequest) {
  return handleCleanup();
}

export async function POST(request: NextRequest) {
  return handleCleanup();
}

async function handleCleanup() {
  try {
    const expiredCount = await cleanupExpiredJobs();
    const message = `Automated cleanup deactivated ${expiredCount} expired job listings past expiration date.`;

    await logCronExecution({
      run_type: 'EXPIRE_CLEANUP',
      jobs_processed: expiredCount,
      status: 'SUCCESS',
      message,
    });

    return NextResponse.json({ success: true, deactivated_count: expiredCount, message });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

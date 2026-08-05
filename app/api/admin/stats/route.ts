import { NextResponse } from 'next/server';
import { getAdminStats, getCronLogs } from '@/lib/db';

export async function GET() {
  try {
    const stats = await getAdminStats();
    const logs = await getCronLogs();
    return NextResponse.json({ stats, logs });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { incrementJobClick } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const referrer = request.headers.get('referer') || 'direct';
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const newClickCount = await incrementJobClick(id, referrer, ip);
    return NextResponse.json({ success: true, jobId: id, click_count: newClickCount });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

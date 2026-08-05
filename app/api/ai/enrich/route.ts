import { NextRequest, NextResponse } from 'next/server';
import { enrichJobWithAI } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { text, existingData } = await request.json();
    if (!text) {
      return NextResponse.json({ error: 'Text prompt or job description is required' }, { status: 400 });
    }

    const enriched = await enrichJobWithAI(text, existingData || {});
    return NextResponse.json(enriched);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

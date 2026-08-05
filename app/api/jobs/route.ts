import { NextRequest, NextResponse } from 'next/server';
import { getJobs, saveJob, deleteJobs } from '@/lib/db';
import { enrichJobWithAI } from '@/lib/gemini';
import { JobFilterParams } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params: JobFilterParams = {
      search: searchParams.get('search') || undefined,
      country: searchParams.get('country') || undefined,
      location: searchParams.get('location') || undefined,
      source: searchParams.get('source') || undefined,
      category: searchParams.get('category') || undefined,
      job_type: searchParams.get('job_type') || undefined,
      visa_only: searchParams.get('visa_only') === 'true',
      date_posted: (searchParams.get('date_posted') as any) || 'all',
      sort_by: (searchParams.get('sort_by') as any) || 'newest',
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '100', 10),
    };

    const result = await getJobs(params);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // If description is provided but AI fields are missing, enrich via Gemini AI automatically
    let enrichedData = body;
    if (body.description && (!body.summary || !body.visa_details)) {
      const aiResult = await enrichJobWithAI(body.description, body);
      enrichedData = { ...body, ...aiResult };
    }

    const { job, isDuplicate } = await saveJob(enrichedData);
    return NextResponse.json({ ...job, isDuplicate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body as { ids: string[] };

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Provide a valid non-empty array of job IDs' }, { status: 400 });
    }

    const deletedCount = await deleteJobs(ids);
    return NextResponse.json({ success: true, deletedCount });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobDetailClient from './JobDetailClient';
import { getJobById } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return { title: 'Job Not Found | EUVisaJobs.eu' };
  return {
    title: `${job.title} at ${job.company_name} | EU Visa Sponsorship Jobs`,
    description: job.summary || job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Visa Opportunities</span>
        </Link>

        <JobDetailClient job={job} />
      </main>

      <Footer />
    </div>
  );
}

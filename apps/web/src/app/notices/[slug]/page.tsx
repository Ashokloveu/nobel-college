import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Bell, Download, ArrowLeft, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'entrance-examination-result-merit-scholarship-2026' },
    { slug: 'first-semester-bca-bbs-class-routine-2026' },
    { slug: 'grade-11-practical-lab-exam-schedule-2026' },
    { slug: 'madhesh-province-regional-merit-scholarship-2026' },
  ];
}

export default function NoticeDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Link href="/notices" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Official Notices
          </Link>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 text-xs font-bold uppercase">
              Official Bulletin
            </span>
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              Admissions Open for Session 2026 (+2 Science, +2 Management, BCA, BBS)
            </h1>

            <div className="text-xs text-slate-400 border-y border-slate-100 py-3">
              Published: August 24, 2026 • Ref: NMC/ADM/2026/001
            </div>

            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                This is to officially inform all aspiring students and guardians that admissions for the academic session 2026 are now open at Nobel Multiple College, Bardibas, Mahottari.
              </p>
              <p>
                Scholarships are available for meritorious students based on SEE / Class 10 GPA and entrance test performance.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
              <Link
                href="/admission"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-nobel-crimson text-white font-bold text-xs hover:bg-nobel-crimson-600 transition"
              >
                Apply for Admission Online
              </Link>
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition"
              >
                <Download className="w-4 h-4" />
                Download Official Prospectus PDF
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, GraduationCap, CheckCircle2, Clock, Award, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'bachelor-in-computer-application-bca' },
    { slug: 'bachelor-of-business-studies-bbs' },
    { slug: 'plus-two-science' },
    { slug: 'plus-two-management' },
  ];
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const isBca = params.slug.includes('bca') || params.slug.includes('computer');
  const programTitle = isBca
    ? 'Bachelor in Computer Application (BCA)'
    : params.slug.includes('bbs')
    ? 'Bachelor of Business Studies (BBS)'
    : params.slug.includes('science')
    ? '+2 Science Stream'
    : '+2 Management Stream';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="bg-nobel-navy-950 text-white p-8 sm:p-12 rounded-3xl space-y-4 shadow-xl">
            <span className="px-3 py-1 rounded bg-amber-500 text-nobel-navy-950 text-xs font-extrabold uppercase">
              Degree Program
            </span>
            <h1 className="text-3xl sm:text-5xl font-black heading-serif text-white">
              {programTitle}
            </h1>
            <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
              Comprehensive academic curriculum designed to provide theoretical depth, practical skill building, and career readiness at Nobel Multiple College, Bardibas.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-amber-400 font-semibold border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Duration: {isBca ? '4 Years (8 Semesters)' : '2-4 Years'}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Accreditation: Affiliated University / Board
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-nobel-navy-900 heading-serif">
                Program Overview & Objectives
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                The {programTitle} program equips students with modern analytical tools, hands-on lab projects, and professional communication skills required for leadership roles in industry and academia.
              </p>

              <h3 className="text-lg font-bold text-nobel-navy-900 pt-2">
                Key Learning Outcomes
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Master core domain fundamentals and practical problem-solving frameworks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Participate in real-world project work, lab research, and internship programs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prepare for postgraduate competitive examinations and international higher studies.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-nobel-navy-900 text-white p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold heading-serif text-amber-400">
                  Admission Inquiry
                </h3>
                <p className="text-xs text-slate-300">
                  Applications are open for Session 2026. Submit your details online to reserve your seat.
                </p>
                <Link
                  href="/admission"
                  className="block text-center w-full py-3 rounded-lg bg-nobel-crimson text-white font-bold text-sm hover:bg-nobel-crimson-600 transition shadow"
                >
                  Apply Online Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

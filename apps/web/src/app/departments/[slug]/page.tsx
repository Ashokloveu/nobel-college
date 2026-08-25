import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Laptop, BookOpen, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'department-of-science-and-technology' },
    { slug: 'department-of-management-studies' },
    { slug: 'department-of-humanities-and-general-education' },
  ];
}

export default function DepartmentDetailPage({ params }: { params: { slug: string } }) {
  const isMgmt = params.slug.includes('management');
  const title = isMgmt ? 'Department of Management Studies' : 'Department of Science & Technology';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <Link href="/departments" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Departments
          </Link>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              {title}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fostering academic excellence, practical laboratory sessions, and career readiness at Nobel Multiple College, Bardibas.
            </p>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-nobel-navy-900">Programs Offered by this Department</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="font-bold text-nobel-navy-900 text-sm">{isMgmt ? 'Bachelor of Business Studies (BBS)' : 'Bachelor in Computer Application (BCA)'}</h3>
                  <Link href="/admission" className="inline-flex items-center gap-1 text-xs font-bold text-nobel-crimson">
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

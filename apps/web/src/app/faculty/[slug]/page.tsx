import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Phone, GraduationCap, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'prof-dr-ram-shrestha' },
    { slug: 'dr-anita-sharma' },
    { slug: 'er-sujan-mahato' },
    { slug: 'prof-bk-mahato' },
  ];
}

export default function FacultyProfilePage({ params }: { params: { slug: string } }) {
  const isPrincipal = params.slug.includes('ram');
  const name = isPrincipal ? 'Prof. Dr. Ram Shrestha' : 'Dr. Anita Sharma';
  const designation = isPrincipal ? 'Principal / Campus Chief' : 'Head of Department';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Link href="/faculty" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Faculty Directory
          </Link>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-nobel-navy-900 text-amber-400 flex items-center justify-center font-bold text-3xl shadow">
                {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h1 className="text-2xl font-bold text-nobel-navy-900">{name}</h1>
                <div className="text-sm font-semibold text-amber-600 uppercase">{designation}</div>
                <div className="text-xs text-slate-500">Nobel Multiple College, Bardibas</div>
              </div>
            </div>

            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-6 space-y-4">
              <h2 className="text-base font-bold text-nobel-navy-900">Biography & Academic Leadership</h2>
              <p>
                Over 20 years of dedicated teaching, research leadership, and academic administration experience in higher education institutions in Nepal.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

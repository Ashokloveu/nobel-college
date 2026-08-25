import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'annual-it-science-exhibition-2026' },
    { slug: 'career-guidance-workshop-2026' },
    { slug: 'central-library-expands-e-journals-2026' },
    { slug: 'annual-sports-meet-football-tournament-2026' },
  ];
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to News Articles
          </Link>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold uppercase">
              Campus News
            </span>
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              Nobel Multiple College Hosts Annual IT & Science Exhibition 2026
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-100 py-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                August 20, 2026
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Published by Campus Editorial Team
              </span>
            </div>

            <div className="rounded-xl overflow-hidden">
              <img src="/images/hero-campus.jpg" alt="College Event" className="w-full h-72 object-cover" />
            </div>

            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                BARDIBAAS, MAHOTTARI — Nobel Multiple College successfully conducted its annual Science and Information Technology Exhibition at the campus hall in Bardibas.
              </p>
              <p>
                Over 50 student groups from +2 Science, +2 Management, and BCA programs presented working prototypes including smart irrigation controllers, web portals, and financial accounting software.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

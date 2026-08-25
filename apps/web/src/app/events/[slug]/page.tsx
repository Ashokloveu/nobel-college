import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'annual-it-science-exhibition-2026' },
    { slug: 'career-orientation-placement-workshop' },
    { slug: 'regional-sports-tournament-2026' },
  ];
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const title = params.slug.includes('exhibition')
    ? 'Annual Inter-College IT & Science Exhibition 2026'
    : 'Career Orientation & Placement Workshop for BBS & BCA';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Events Calendar
          </Link>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <span className="px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold uppercase">
              Upcoming Campus Event
            </span>
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-nobel-crimson" />
                September 15, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-nobel-crimson" />
                10:00 AM - 04:00 PM
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-nobel-crimson" />
                Campus Main Hall • Bardibas
              </span>
            </div>

            <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p>
                Nobel Multiple College cordially invites all students, faculty members, parents, and community leaders to join us for the upcoming {title}.
              </p>
              <p>
                Participants will showcase groundbreaking projects in software development, robotics, environmental science, and business management. Special awards will be presented to outstanding student innovations.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                href="/admission"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow"
              >
                Inquire for Participation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

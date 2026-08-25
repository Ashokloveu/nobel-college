import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'campus-building' },
    { slug: 'computer-lab' },
    { slug: 'central-library' },
  ];
}

export default function GalleryAlbumPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <Link href="/gallery" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-nobel-navy-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Media Gallery
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              Campus Infrastructure & Event Photos
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src="/images/hero-campus.jpg" alt="Campus Building" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src="/images/computer-lab.jpg" alt="Computer Lab" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <img src="/images/library.jpg" alt="Library" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

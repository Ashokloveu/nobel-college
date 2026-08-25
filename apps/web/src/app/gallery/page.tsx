import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-nobel-crimson tracking-wider uppercase">
              Campus Life & Media
            </span>
            <h1 className="text-4xl font-extrabold text-nobel-navy-900 heading-serif">
              Photo & Media Gallery
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <img src="/images/hero-campus.jpg" alt="Campus Building" className="w-full h-56 object-cover group-hover:scale-105 transition" />
              <div className="p-4 font-bold text-sm text-nobel-navy-900">Campus Infrastructure</div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <img src="/images/computer-lab.jpg" alt="IT Lab" className="w-full h-56 object-cover group-hover:scale-105 transition" />
              <div className="p-4 font-bold text-sm text-nobel-navy-900">Computer Science Laboratory</div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <img src="/images/library.jpg" alt="Library" className="w-full h-56 object-cover group-hover:scale-105 transition" />
              <div className="p-4 font-bold text-sm text-nobel-navy-900">Central Library</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

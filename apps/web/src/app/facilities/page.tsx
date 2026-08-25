'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Laptop,
  Library,
  Building2,
  ShieldCheck,
  Bus,
  Trophy,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Coffee,
  Microscope,
  Tv,
  Wifi,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';

interface FacilityItem {
  id: string;
  title: string;
  category: 'LABS' | 'LIBRARY' | 'CAMPUS' | 'SERVICES';
  image: string;
  tag: string;
  specs: string[];
  description: string;
  hours: string;
  icon: any;
}

const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'computer-lab',
    title: 'High-Tech Computer & Software Lab',
    category: 'LABS',
    image: '/images/computer-lab.jpg',
    tag: 'BCA & IT Center',
    specs: ['100+ Core-i7 Desktop Workstations', 'Dedicated Optical Fiber Gigabit Internet', 'Linux & Windows Server Racks', 'Visual Studio, MySQL & Web Dev Suites'],
    description: 'Equipped with high-performance desktop computers, optical fiber internet, software development suites, and dedicated project workspaces for BCA & IT students.',
    hours: '06:00 AM – 05:00 PM (Sun – Fri)',
    icon: Laptop,
  },
  {
    id: 'central-library',
    title: 'Central Reference & E-Library Hub',
    category: 'LIBRARY',
    image: '/images/library.jpg',
    tag: 'Knowledge Center',
    specs: ['15,000+ Physical Textbooks & Volumes', 'E-Journal Subscriptions & Digital Kiosk', 'Quiet Individual Study Cubicles', 'Barcode Automated Book Borrowing'],
    description: 'Stocked with thousands of academic textbooks, reference journals, research papers, e-books, and quiet study cubicles for comprehensive research.',
    hours: '06:00 AM – 05:00 PM (Sun – Fri)',
    icon: Library,
  },
  {
    id: 'science-lab',
    title: 'Physics, Chemistry & Biology Labs',
    category: 'LABS',
    image: '/images/hero-campus.jpg',
    tag: '+2 Science Labs',
    specs: ['High-Precision Compound Microscopes', 'Fume Hoods & Chemical Storage Cabinets', 'Digital Oscilloscopes & Optical Benches', 'Strict Safety Equipment & Eyewash Stations'],
    description: 'Fully-equipped scientific laboratories facilitating hands-on practical experiments for +2 Science students in Physics, Chemistry, and Biology.',
    hours: '07:00 AM – 04:00 PM (Sun – Fri)',
    icon: Microscope,
  },
  {
    id: 'auditorium',
    title: '500-Seat Multipurpose Auditorium',
    category: 'CAMPUS',
    image: '/images/hero-campus.jpg',
    tag: 'Events & Seminars',
    specs: ['500-Seat Tiered Seating Capacity', 'High-Definition 4K Projection System', 'Surround Sound Audio Infrastructure', 'Central Air Conditioning'],
    description: 'Host venue for annual IT exhibitions, guest lectures, national academic seminars, cultural performances, and orientation programs in Bardibas.',
    hours: 'Event Schedule Based',
    icon: Tv,
  },
  {
    id: 'bus-transport',
    title: 'Safe GPS-Tracked Transportation Fleet',
    category: 'SERVICES',
    image: '/images/hero-campus.jpg',
    tag: 'Campus Transport',
    specs: ['Routes Covering Bardibas, Jaleshwar & Sarlahi', 'Live GPS Tracking & Driver Communication', 'Comfortable Air-Cooled Seating', 'Dedicated Transport Safety Officers'],
    description: 'Punctual and secure daily bus service transporting students across Bardibas, Mahottari, Dhanusha, and neighbouring Sarlahi districts.',
    hours: 'Daily Pick & Drop Schedules',
    icon: Bus,
  },
  {
    id: 'cafeteria',
    title: 'Hygienic Campus Cafeteria & Lounge',
    category: 'SERVICES',
    image: '/images/hero-campus.jpg',
    tag: 'Dining & Refreshments',
    specs: ['Fresh Organic Nepalese Meals & Snacks', 'Strict Hygiene & Quality Standards', 'Barista Coffee & Fresh Juice Station', 'Spacious Indoor & Outdoor Seating'],
    description: 'Serves fresh, nutritious meals, tea, coffee, and snacks prepared under strict health and sanitation guidelines for students and faculty.',
    hours: '06:30 AM – 04:30 PM (Sun – Fri)',
    icon: Coffee,
  },
];

export default function FacilitiesPage() {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'LABS' | 'LIBRARY' | 'CAMPUS' | 'SERVICES'>('ALL');
  const [activeModalFacility, setActiveModalFacility] = useState<FacilityItem | null>(null);

  const filteredFacilities = FACILITIES_DATA.filter(
    (f) => categoryFilter === 'ALL' || f.category === categoryFilter
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          {/* Hero Header Banner */}
          <div className="bg-gradient-to-r from-nobel-navy-950 via-nobel-navy-900 to-nobel-navy-800 text-white p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ne' ? 'भौतिक पूर्वाधार तथा सुविधाहरू' : 'World-Class Infrastructure & Learning Environment'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'क्याम्पस सुविधाहरू' : 'Premium Campus Facilities'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजमा अध्ययनरत विद्यार्थीहरूका लागि आधुनिक कम्प्युटर ल्याब, पुस्तकालय, यातायात र खेलकुद पूर्वाधार।'
                  : 'State-of-the-art laboratories, central reference library, GPS-tracked transportation fleet, and modern sports infrastructure empowering student excellence in Bardibas.'}
              </p>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(['ALL', 'LABS', 'LIBRARY', 'CAMPUS', 'SERVICES'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'ALL'
                    ? (lang === 'ne' ? 'सबै सुविधाहरू (All)' : 'All Facilities')
                    : cat === 'LABS'
                    ? (lang === 'ne' ? 'प्रयोगशालाहरू (Labs)' : 'IT & Science Labs')
                    : cat === 'LIBRARY'
                    ? (lang === 'ne' ? 'पुस्तकालय (Library)' : 'Central Library')
                    : cat === 'CAMPUS'
                    ? (lang === 'ne' ? 'क्याम्पस हल (Auditorium)' : 'Campus & Auditorium')
                    : (lang === 'ne' ? 'यातातयात र क्याफेटेरिया' : 'Transport & Dining')}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900">{filteredFacilities.length}</strong> Premium Facilities
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((fac) => {
              const IconComp = fac.icon;
              return (
                <div
                  key={fac.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition duration-500 flex flex-col justify-between group"
                >
                  <div>
                    {/* Facility Photo Frame */}
                    <div className="relative h-60 overflow-hidden bg-slate-900">
                      <img
                        src={fac.image}
                        alt={fac.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-nobel-navy-950/90 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-800 shadow">
                        {fac.tag}
                      </div>

                      {/* Lightbox Zoom Button */}
                      <button
                        onClick={() => setActiveModalFacility(fac)}
                        className="absolute bottom-4 right-4 p-2 rounded-xl bg-slate-950/80 hover:bg-amber-500 hover:text-nobel-navy-950 text-white transition shadow"
                        title="View Facility Specs & Image"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                          <IconComp className="w-4 h-4 text-nobel-navy-900" />
                          <span>{fac.tag}</span>
                        </div>
                        <h2 className="text-xl font-bold text-nobel-navy-900 leading-snug">
                          {fac.title}
                        </h2>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {fac.description}
                      </p>

                      {/* Technical Specs List */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                          Technical Specifications & Highlights:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {fac.specs.slice(0, 3).map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer Operating Hours */}
                  <div className="p-6 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {fac.hours}
                      </span>
                      <button
                        onClick={() => setActiveModalFacility(fac)}
                        className="font-bold text-nobel-navy-900 hover:text-nobel-crimson transition flex items-center gap-1"
                      >
                        Full Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔍 FACILITY LIGHTBOX SPECIFICATIONS MODAL */}
          {activeModalFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative space-y-6 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setActiveModalFacility(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 sm:h-80">
                  <img
                    src={activeModalFacility.image}
                    alt={activeModalFacility.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nobel-navy-950/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs text-amber-400 font-extrabold uppercase">
                      {activeModalFacility.tag}
                    </span>
                    <h3 className="text-2xl font-black heading-serif">{activeModalFacility.title}</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5 text-xs text-slate-700">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {activeModalFacility.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <h4 className="font-extrabold uppercase text-nobel-navy-900 text-xs">
                      All Technical Specifications & Equipment:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalFacility.specs.map((sp, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-800">{sp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">
                      Operating Hours: <strong>{activeModalFacility.hours}</strong>
                    </span>
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 rounded-xl bg-nobel-navy-900 text-amber-400 font-bold text-xs hover:bg-nobel-navy-800 transition"
                    >
                      Campus Visit Inquiry →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

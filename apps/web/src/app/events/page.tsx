'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Users,
  CheckCircle2,
  Share2,
  CalendarPlus,
  Building2,
  X,
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  slug: string;
  month: string;
  day: string;
  year: string;
  startDate: string;
  time: string;
  location: string;
  organizer: string;
  category: 'EXHIBITION' | 'WORKSHOP' | 'SPORTS' | 'ACADEMIC';
  description: string;
  speaker?: string;
  registrationOpen: boolean;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Annual Inter-College IT & Science Exhibition 2026',
    slug: 'annual-it-science-exhibition-2026',
    month: 'SEP',
    day: '15',
    year: '2026',
    startDate: 'September 15, 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Campus Main Hall & Computer Lab Block',
    organizer: 'Department of Science & Technology',
    category: 'EXHIBITION',
    description: 'Annual flagship exhibition showcasing over 30 student projects in software development, web engineering, physics demonstrations, and AI robotics in Bardibas.',
    speaker: 'Er. Sujan Mahato & Tech Leads',
    registrationOpen: true,
  },
  {
    id: '2',
    title: 'Career Orientation & Placement Workshop for BBS & BCA',
    slug: 'career-orientation-placement-workshop',
    month: 'SEP',
    day: '28',
    year: '2026',
    startDate: 'September 28, 2026',
    time: '11:00 AM - 02:00 PM',
    location: 'Central Auditorium Room 102',
    organizer: 'Career Counseling Cell',
    category: 'WORKSHOP',
    description: 'Interactive session with senior HR professionals, software engineers, and bank managers guiding upcoming graduates on career opportunities.',
    speaker: 'Dr. Anita Sharma & Guest HR Officers',
    registrationOpen: true,
  },
  {
    id: '3',
    title: 'Regional Inter-College Football & Sports Tournament 2026',
    slug: 'regional-sports-tournament-2026',
    month: 'OCT',
    day: '10',
    year: '2026',
    startDate: 'October 10, 2026',
    time: '08:00 AM - 04:00 PM',
    location: 'Nobel Sports Ground, Bardibas-3',
    organizer: 'Campus Sports & Student Welfare Union',
    category: 'SPORTS',
    description: 'Annual inter-college sports championship featuring football, badminton, and table tennis tournaments across Mahottari district.',
    speaker: 'Sports Committee Coordinator',
    registrationOpen: true,
  },
];

import { getStoredItems } from '@/lib/storage';

export default function EventsPage() {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRsvpEvent, setActiveRsvpEvent] = useState<EventItem | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [allEvents, setAllEvents] = useState<EventItem[]>(EVENTS_DATA);

  React.useEffect(() => {
    const loadEvents = () => {
      try {
        const saved = localStorage.getItem('nobel_cms_events');
        if (saved) {
          const custom: any[] = JSON.parse(saved);
          const formatted: EventItem[] = custom.map((c, i) => {
            const dateObj = new Date(c.date || Date.now());
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            return {
              id: c.id || `custom-${i}`,
              title: c.title,
              slug: c.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'event',
              month: months[dateObj.getMonth()] || 'OCT',
              day: dateObj.getDate() ? String(dateObj.getDate()) : '15',
              year: String(dateObj.getFullYear() || 2026),
              startDate: c.date || 'October 15, 2026',
              time: '10:00 AM - 03:00 PM',
              location: c.location || 'Campus Main Hall',
              organizer: 'Campus Administration',
              category: 'WORKSHOP',
              description: c.title,
              registrationOpen: true,
            };
          });
          const customTitles = new Set(formatted.map((f) => f.title));
          const defaultFiltered = EVENTS_DATA.filter((e) => !customTitles.has(e.title));
          setAllEvents([...formatted, ...defaultFiltered]);
        }
      } catch (err) {
        console.error('Failed to parse events storage:', err);
      }
    };

    loadEvents();
    window.addEventListener('storage', loadEvents);
    return () => window.removeEventListener('storage', loadEvents);
  }, []);

  const filteredEvents = allEvents.filter((e) => {
    const matchesCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          {/* Header Title Banner */}
          <div className="bg-gradient-to-r from-nobel-navy-950 via-nobel-navy-900 to-nobel-navy-800 text-white p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ne' ? 'क्याम्पस कार्यक्रम तालिका' : 'Official Campus Events & Seminars'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'क्याम्पस कार्यक्रमहरू' : 'College Events Calendar'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजमा आयोजना हुने आईटी प्रदर्शनी, क्यारियर वर्कशप र खेलकुद प्रतियोगिताहरू।'
                  : 'Join our academic conferences, IT exhibitions, career counseling bootcamps, and regional sports meets in Bardibas.'}
              </p>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
              {['ALL', 'EXHIBITION', 'WORKSHOP', 'SPORTS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? (lang === 'ne' ? 'सबै कार्यक्रम (All)' : 'All Events') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search event title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
              />
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                {/* Date Badge Card */}
                <div className="w-20 h-24 rounded-2xl bg-nobel-navy-950 text-white flex flex-col items-center justify-center shrink-0 shadow-lg border border-slate-800 group-hover:scale-105 transition transform">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider">{ev.month}</span>
                  <span className="text-3xl font-black font-mono leading-none my-0.5">{ev.day}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{ev.year}</span>
                </div>

                {/* Event Content Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase">
                      {ev.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                      {ev.organizer}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif leading-snug group-hover:text-nobel-crimson transition">
                    {ev.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {ev.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {ev.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-nobel-crimson" />
                      {ev.location}
                    </span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row md:flex-col items-center gap-2.5 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-none border-slate-100">
                  <button
                    onClick={() => {
                      setActiveRsvpEvent(ev);
                      setRsvpSubmitted(false);
                    }}
                    className="w-full md:w-44 py-2.5 px-4 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-2"
                  >
                    <CalendarPlus className="w-4 h-4 text-amber-400" />
                    Register / RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 📅 EVENT RSVP MODAL */}
          {activeRsvpEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-5">
                <button
                  onClick={() => setActiveRsvpEvent(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {rsvpSubmitted ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Registration Confirmed!</h3>
                    <p className="text-xs text-slate-600">
                      Your seat RSVP for <strong>{activeRsvpEvent.title}</strong> has been registered. An event reminder has been set for {activeRsvpEvent.startDate}.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveRsvpEvent(null)}
                        className="px-6 py-2.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-xs">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-bold text-amber-600 uppercase">Event Pass RSVP</span>
                      <h3 className="text-lg font-bold text-nobel-navy-900 heading-serif">
                        {activeRsvpEvent.title}
                      </h3>
                      <p className="text-slate-500">{activeRsvpEvent.startDate} • {activeRsvpEvent.location}</p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setRsvpSubmitted(true);
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sujan Mahato"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 uppercase mb-1">Mobile Phone Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="+977-98XXXXXXXX"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-2"
                      >
                        Confirm Event Seat RSVP →
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

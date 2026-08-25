'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Tag,
  User,
  Share2,
  TrendingUp,
  Bookmark,
  ChevronRight,
  Eye,
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: 'CAMPUS LIFE' | 'ACADEMIC' | 'RESEARCH & IT' | 'SPORTS';
  image: string;
  author: string;
  authorRole: string;
  viewsCount: number;
  isFeatured?: boolean;
}

const ARTICLES_DATA: NewsArticle[] = [
  {
    id: '1',
    title: 'Nobel Multiple College Hosts Annual IT & Science Exhibition 2026',
    slug: 'annual-it-science-exhibition-2026',
    summary: 'Students from BCA and +2 Science showcased over 30 innovative software applications, AI robotics, web systems, and hardware projects in Bardibas campus hall.',
    content: 'The Annual IT & Science Exhibition 2026 at Nobel Multiple College brought together students, faculty, and industry leaders from Madhesh Province...',
    date: 'August 20, 2026',
    readTime: '4 min read',
    category: 'RESEARCH & IT',
    image: '/images/computer-lab.jpg',
    author: 'Er. Sujan Mahato',
    authorRole: 'BCA Coordinator',
    viewsCount: 1420,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Oriented Workshop on Career Guidance & Higher Education Opportunities',
    slug: 'career-guidance-workshop-2026',
    summary: 'Distinguished industry experts and university scholars delivered sessions on BCA, BBS, and postgraduate career paths for upcoming graduates.',
    content: 'Nobel Multiple College organized a comprehensive career orientation session for final year students...',
    date: 'August 14, 2026',
    readTime: '3 min read',
    category: 'ACADEMIC',
    image: '/images/hero-campus.jpg',
    author: 'Dr. Anita Sharma',
    authorRole: 'HOD Management',
    viewsCount: 980,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Central Library Expands E-Journal Subscriptions & Digital Learning Kiosk',
    slug: 'central-library-expands-e-journals-2026',
    summary: 'The college central reference library has added 5,000+ digital e-books and university research journals to its online catalogue.',
    content: 'In line with our Smart Campus initiative, Nobel Multiple College central library has upgraded its digital database...',
    date: 'August 08, 2026',
    readTime: '3 min read',
    category: 'ACADEMIC',
    image: '/images/library.jpg',
    author: 'Library Desk',
    authorRole: 'Chief Librarian',
    viewsCount: 1150,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Annual Inter-College Sports Meet & Football Tournament Final',
    slug: 'annual-sports-meet-football-tournament-2026',
    summary: 'Nobel Multiple College student sports committee hosted the regional inter-college football championship in Bardibas ground.',
    content: 'The sports week concluded with an exciting final match between BCA and BBS faculties...',
    date: 'July 28, 2026',
    readTime: '5 min read',
    category: 'SPORTS',
    image: '/images/hero-campus.jpg',
    author: 'Sports Committee',
    authorRole: 'Campus Club',
    viewsCount: 840,
    isFeatured: false,
  },
];

export default function NewsPage() {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredArticle = ARTICLES_DATA.find((a) => a.isFeatured) || ARTICLES_DATA[0];

  const filteredArticles = ARTICLES_DATA.filter((a) => {
    const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
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
                {lang === 'ne' ? 'समाचार तथा प्रेस विज्ञप्ति' : 'Official News, Articles & Press Releases'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'क्याम्पस समाचार' : 'College News & Stories'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजका शैक्षिक गतिविधि, प्रविधि प्रदर्शनी, खेलकुद र सफलताका कथा।'
                  : 'Stay informed with the latest academic achievements, science exhibitions, career workshops, and campus life stories at Nobel Multiple College.'}
              </p>
            </div>
          </div>

          {/* 🌟 FEATURED SPOTLIGHT ARTICLE HERO */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 left-4 bg-nobel-navy-950 text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-slate-800 shadow">
                ★ FEATURED STORY
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold uppercase">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-nobel-navy-900 heading-serif leading-snug group-hover:text-nobel-crimson transition">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-10 h-10 rounded-full bg-nobel-navy-900 text-amber-400 flex items-center justify-center font-bold">
                    {featuredArticle.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{featuredArticle.author}</div>
                    <div className="text-[10px] text-slate-500">{featuredArticle.date}</div>
                  </div>
                </div>

                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
                >
                  Read Full Story
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
              {['ALL', 'RESEARCH & IT', 'ACADEMIC', 'SPORTS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? (lang === 'ne' ? 'सबै समाचार (All)' : 'All News') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles & news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
              />
            </div>
          </div>

          {/* Articles Grid & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Articles List */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Article Cover Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-nobel-navy-950/90 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-800">
                        {art.category}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {art.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-nobel-navy-900 leading-snug group-hover:text-nobel-crimson transition">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs pt-4">
                    <span className="text-[11px] text-slate-500 font-medium">By {art.author}</span>
                    <Link
                      href={`/news/${art.slug}`}
                      className="font-extrabold text-nobel-navy-900 hover:text-nobel-crimson transition flex items-center gap-1"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar: Trending Stories & Newsletter */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trending Widget */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <TrendingUp className="w-5 h-5 text-nobel-crimson" />
                  <h3 className="font-black text-nobel-navy-900 text-base heading-serif">
                    {lang === 'ne' ? 'चर्चित समाचार' : 'Top Trending Stories'}
                  </h3>
                </div>

                <div className="space-y-4">
                  {ARTICLES_DATA.map((art, idx) => (
                    <Link
                      key={art.id}
                      href={`/news/${art.slug}`}
                      className="flex items-start gap-3 group/trend border-b border-slate-100 pb-3 last:border-none last:pb-0"
                    >
                      <span className="font-mono font-black text-lg text-slate-300 group-hover/trend:text-amber-500 transition">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900 group-hover/trend:text-nobel-navy-900 transition leading-snug">
                          {art.title}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          <span>{art.viewsCount} reads</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Box */}
              <div className="bg-nobel-navy-950 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <h3 className="font-black text-amber-400 text-base heading-serif">
                  {lang === 'ne' ? 'क्याम्पस न्युजलेटर सदस्य बन्नुहोस्' : 'Subscribe to Campus Bulletin'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Get official press releases and exam announcements sent directly to your inbox.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button className="w-full py-2.5 rounded-xl bg-amber-500 text-nobel-navy-950 font-black text-xs hover:bg-amber-400 transition shadow">
                    Subscribe Free
                  </button>
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

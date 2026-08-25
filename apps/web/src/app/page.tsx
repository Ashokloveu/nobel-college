'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building2,
  Calendar,
  Bell,
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  MapPin,
  Laptop,
  Library,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* 1. HERO SECTION WITH IMAGE BANNER */}
        <section className="relative bg-gradient-to-r from-nobel-navy-950 via-nobel-navy-900 to-nobel-navy-800 text-white py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {t('hero_tag')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight heading-serif">
                {t('hero_title_1')}{' '}
                <span className="text-amber-400">{t('hero_title_2')}</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {t('hero_desc')}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-nobel-crimson text-white font-bold text-base hover:bg-nobel-crimson-600 shadow-lg shadow-nobel-crimson/30 transition transform hover:-translate-y-0.5"
                >
                  {t('btn_apply_now')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-base hover:bg-white/20 border border-white/20 transition"
                >
                  {t('btn_explore_programs')}
                </Link>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <img
                  src="/images/hero-campus.jpg"
                  alt="Nobel Multiple College Campus Building Bardibas"
                  className="w-full h-80 lg:h-[420px] object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nobel-navy-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                    {lang === 'ne' ? 'बर्दिबास, महोत्तरी' : 'Bardibas, Mahottari'}
                  </span>
                  <span className="text-white text-lg font-bold">
                    {lang === 'ne' ? 'नोबेल मल्टिपल कलेज मुख्य भवन' : 'Nobel Multiple College Campus Infrastructure'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ACADEMIC STATISTICS BAR */}
        <section className="bg-nobel-navy-950 py-8 border-y border-nobel-navy-800 text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-black text-amber-400">4+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">{t('stat_programs')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-black text-amber-400">1000+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">{t('stat_students')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-black text-amber-400">50+</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">{t('stat_faculty')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-black text-amber-400">100%</div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">{t('stat_practical')}</div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT COLLEGE SECTION */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-nobel-crimson tracking-wider uppercase">
                {lang === 'ne' ? 'नोबेल मल्टिपल कलेजमा स्वागत छ' : 'Welcome to Nobel Multiple College'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nobel-navy-900 heading-serif">
                {lang === 'ne' ? 'मधेश प्रदेशमा शैक्षिक उत्कृष्टताको नयाँ गन्तव्य' : 'Fostering Educational Brilliance in Madhesh Province'}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Nobel Multiple College, located in Bardibas, Mahottari, stands as a beacon of academic quality and career development. We offer comprehensive higher secondary (+2 Science & Management) and university undergraduate programs tailored to meet global standards.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Modern Digital Infrastructure:</strong> High-speed computer laboratories, multimedia classrooms, and digital learning tools.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Experienced Faculty Team:</strong> Dedicated professors, researchers, and industry specialists providing personalized mentorship.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Holistic Personality Growth:</strong> Sports, science exhibitions, debate competitions, and community outreach.
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-nobel-navy-900 font-bold hover:text-nobel-crimson transition text-sm"
                >
                  Read Campus History & Message
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Campus Chief Message Card */}
            <div className="lg:col-span-6 bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
              <div className="absolute top-4 right-4 text-slate-200">
                <Award className="w-16 h-16" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
                Campus Chief's Desk
              </span>
              <blockquote className="text-slate-700 text-base italic leading-relaxed mb-6">
                "Our mission at Nobel Multiple College is to equip our youth with rigorous academic knowledge, critical thinking skills, and moral integrity so they lead positive change in Nepal and beyond."
              </blockquote>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-4">
                <div className="w-12 h-12 rounded-full bg-nobel-navy-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow">
                  RS
                </div>
                <div>
                  <div className="font-bold text-nobel-navy-900 text-sm">
                    Prof. Dr. Ram Shrestha
                  </div>
                  <div className="text-xs text-slate-500">Principal / Campus Chief</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ACADEMIC PROGRAMS GRID */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-nobel-crimson tracking-wider uppercase">
                Degrees & Courses
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nobel-navy-900 heading-serif">
                Featured Academic Programs
              </h2>
              <p className="text-slate-600 text-sm">
                Explore our accredited Higher Secondary and Bachelor degree options designed for modern careers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Program 1: BCA */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    BACHELOR
                  </span>
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    Bachelor in Computer Application (BCA)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    4-Year undergraduate program focusing on software engineering, web development, network administration, and AI foundations.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">4 Years (8 Semesters)</span>
                  <Link href="/programs/bachelor-in-computer-application-bca" className="text-xs font-bold text-nobel-navy-900 hover:text-nobel-crimson">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Program 2: BBS */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    BACHELOR
                  </span>
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    Bachelor of Business Studies (BBS)
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    4-Year comprehensive management degree covering accounting, corporate finance, marketing management, and entrepreneurship.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">4 Years</span>
                  <Link href="/programs/bachelor-of-business-studies-bbs" className="text-xs font-bold text-nobel-navy-900 hover:text-nobel-crimson">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Program 3: +2 Science Stream */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    +2 / DIPLOMA
                  </span>
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    +2 Science Stream
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    2-Year higher secondary science curriculum in Physics, Chemistry, Biology, Mathematics, and Computer Science.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">2 Years</span>
                  <Link href="/programs/plus-two-science" className="text-xs font-bold text-nobel-navy-900 hover:text-nobel-crimson">
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Program 4: +2 Management Stream */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-100 text-purple-800">
                    +2 / DIPLOMA
                  </span>
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    +2 Management Stream
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    2-Year foundation in Business Studies, Accountancy, Economics, Hotel Management, and Business Mathematics.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">2 Years</span>
                  <Link href="/programs/plus-two-management" className="text-xs font-bold text-nobel-navy-900 hover:text-nobel-crimson">
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CAMPUS FACILITIES SHOWCASE */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-nobel-crimson tracking-wider uppercase">
                World-Class Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nobel-navy-900 heading-serif">
                Campus Facilities & Learning Environment
              </h2>
              <p className="text-slate-600 text-sm">
                Providing students with modern laboratories, digital library systems, and vibrant sports infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Computer Lab Card */}
              <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/computer-lab.jpg"
                    alt="Nobel College Computer Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-nobel-navy-950 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                    IT & Software Lab
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    High-Tech Computer Laboratory
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Equipped with high-performance desktop computers, optical fiber internet, software development suites, and dedicated project workspaces for BCA students.
                  </p>
                </div>
              </div>

              {/* Library Card */}
              <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/library.jpg"
                    alt="Nobel College Central Library"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-nobel-navy-950 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                    Central Library
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-nobel-navy-900">
                    Central Library & Digital Catalogue
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stocked with thousands of academic textbooks, reference journals, research papers, e-books, and quiet study cubicles for comprehensive research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. NOTICES & UPCOMING EVENTS */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Important Notices */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-nobel-crimson" />
                  <h2 className="text-2xl font-bold text-nobel-navy-900 heading-serif">
                    Important College Notices
                  </h2>
                </div>
                <Link href="/notices" className="text-xs font-bold text-nobel-navy-900 hover:underline">
                  View All Notices →
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-amber-50 border-l-4 border-amber-500 flex items-start gap-4 shadow-sm">
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-xs font-extrabold uppercase shrink-0">
                    IMPORTANT
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 hover:text-nobel-navy-900 transition cursor-pointer">
                      Admissions Open for Session 2026 (+2 Science, +2 Management, BCA, BBS)
                    </h3>
                    <p className="text-xs text-slate-600">
                      Online applications are now open for the upcoming academic year. Submit forms early for merit scholarships.
                    </p>
                    <div className="text-[11px] text-slate-400">Published: August 2026</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-slate-200 flex items-start gap-4 shadow-sm">
                  <FileText className="w-5 h-5 text-nobel-navy-900 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      First Semester Internal Examination Routine Notice
                    </h3>
                    <p className="text-xs text-slate-600">
                      Routine for BCA and BBS first-semester internal evaluation exams has been published on campus bulletin board.
                    </p>
                    <div className="text-[11px] text-slate-400">Published: August 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-nobel-navy-900" />
                  <h2 className="text-2xl font-bold text-nobel-navy-900 heading-serif">
                    Upcoming Events
                  </h2>
                </div>
                <Link href="/events" className="text-xs font-bold text-nobel-navy-900 hover:underline">
                  Calendar →
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 rounded-lg bg-nobel-navy-900 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-semibold uppercase text-amber-400">SEP</span>
                    <span className="text-lg font-bold">15</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-nobel-navy-900">
                      Annual Inter-College IT & Science Exhibition 2026
                    </h3>
                    <p className="text-xs text-slate-500">Campus Main Hall • Bardibas</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-14 h-14 rounded-lg bg-nobel-navy-900 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-semibold uppercase text-amber-400">SEP</span>
                    <span className="text-lg font-bold">28</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-nobel-navy-900">
                      Career Orientation & Placement Workshop
                    </h3>
                    <p className="text-xs text-slate-500">Auditorium Room 102</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ADMISSION BANNER CTA */}
        <section className="py-16 bg-gradient-to-r from-nobel-crimson-700 to-nobel-crimson text-white">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold heading-serif">
              Begin Your Journey with Nobel Multiple College Today
            </h2>
            <p className="text-base text-red-100 max-w-2xl mx-auto">
              Our online admission portal simplifies your application process. Submit your details online to get in touch with our admission counselling desk.
            </p>
            <div>
              <Link
                href="/admission"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-nobel-crimson-800 font-extrabold text-base hover:bg-amber-400 transition shadow-xl"
              >
                Start Online Application Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

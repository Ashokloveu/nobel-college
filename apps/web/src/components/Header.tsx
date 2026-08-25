'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Menu,
  X,
  Search,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Lock,
  Award,
  UserCheck,
  Globe,
  Clock,
  Calendar,
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t, currentTime, currentBsDate, currentAdDate } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar with Live Real-Time Clock & Nepal BS Date */}
      <div className="bg-nobel-navy-950 text-white text-xs py-2 px-4 border-b border-nobel-navy-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Location & Real-Time Clock */}
          <div className="flex items-center gap-4 text-slate-300 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              {t('location_tag')}
            </span>

            {/* Real-time Clock & BS/AD Date */}
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono font-bold">
              <Clock className="w-3 h-3 text-amber-400" />
              {currentTime}
            </span>

            <span className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
              <Calendar className="w-3 h-3 text-amber-400" />
              {currentBsDate} ({currentAdDate})
            </span>
          </div>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Multi-Language Toggle Button (English <-> Nepali) */}
            <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded font-bold text-[10px] transition ${
                  lang === 'en'
                    ? 'bg-amber-500 text-nobel-navy-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLang('ne')}
                className={`px-2 py-0.5 rounded font-bold text-[10px] transition ${
                  lang === 'ne'
                    ? 'bg-amber-500 text-nobel-navy-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                नेपाली
              </button>
            </div>

            <Link
              href="/entrance-exam"
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold hover:bg-amber-500/30 transition text-[11px]"
            >
              <Award className="w-3 h-3 text-amber-400" />
              {t('btn_entrance_exam')}
            </Link>

            <Link
              href="/student-portal"
              className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold hover:bg-blue-500/30 transition text-[11px]"
            >
              <UserCheck className="w-3 h-3 text-blue-400" />
              {t('btn_student_portal')}
            </Link>

            <Link
              href="/admin/login"
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-nobel-navy-800 hover:bg-nobel-navy-700 text-amber-400 font-medium transition text-[11px]"
            >
              <Lock className="w-3 h-3" />
              {t('btn_staff_login')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-lg bg-nobel-navy-900 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition transform">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <span className="block text-xl font-black tracking-tight text-nobel-navy-900 heading-serif">
              {t('college_name')}
            </span>
            <span className="block text-xs font-semibold text-amber-600 uppercase tracking-widest">
              {lang === 'ne' ? 'बर्दिबास, महोत्तरी, नेपाल' : 'Bardibas, Mahottari, Nepal'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 font-medium text-xs sm:text-sm text-slate-700">
          <Link href="/" className="hover:text-nobel-navy-900 transition">
            {t('nav_home')}
          </Link>
          <Link href="/about" className="hover:text-nobel-navy-900 transition">
            {t('nav_about')}
          </Link>
          <Link href="/programs" className="hover:text-nobel-navy-900 transition">
            {t('nav_programs')}
          </Link>
          <Link href="/departments" className="hover:text-nobel-navy-900 transition">
            {t('nav_departments')}
          </Link>
          <Link href="/faculty" className="hover:text-nobel-navy-900 transition">
            {t('nav_faculty')}
          </Link>
          <Link href="/facilities" className="hover:text-nobel-navy-900 transition">
            {t('nav_facilities')}
          </Link>
          <Link href="/news" className="hover:text-nobel-navy-900 transition">
            {t('nav_news')}
          </Link>
          <Link href="/notices" className="hover:text-nobel-navy-900 transition">
            {t('nav_notices')}
          </Link>
          <Link href="/events" className="hover:text-nobel-navy-900 transition">
            {t('nav_events')}
          </Link>
          <Link href="/downloads" className="hover:text-nobel-navy-900 transition">
            {t('nav_downloads')}
          </Link>
          <Link href="/contact" className="hover:text-nobel-navy-900 transition">
            {t('nav_contact')}
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Search site"
            className="p-2 text-slate-600 hover:text-nobel-navy-900 hover:bg-slate-100 rounded-full transition"
          >
            <Search className="w-5 h-5" />
          </Link>
          <Link
            href="/admission"
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold rounded-md bg-nobel-crimson text-white hover:bg-nobel-crimson-600 shadow transition"
          >
            {t('btn_online_admission')}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl text-sm font-medium">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Select Language / भाषा:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded font-bold text-xs ${
                  lang === 'en' ? 'bg-nobel-navy-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('ne')}
                className={`px-3 py-1 rounded font-bold text-xs ${
                  lang === 'ne' ? 'bg-nobel-navy-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                नेपाली
              </button>
            </div>
          </div>

          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-100">
            {t('nav_home')}
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-100">
            {t('nav_about')}
          </Link>
          <Link href="/programs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-100">
            {t('nav_programs')}
          </Link>
          <Link href="/entrance-exam" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-600 font-bold border-b border-slate-100">
            🏆 {t('btn_entrance_exam')}
          </Link>
          <Link href="/student-portal" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-700 font-bold border-b border-slate-100">
            🎓 {t('btn_student_portal')}
          </Link>
          <Link href="/notices" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-100">
            {t('nav_notices')}
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-800 border-b border-slate-100">
            {t('nav_contact')}
          </Link>
          <div className="pt-2">
            <Link
              href="/admission"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-md bg-nobel-crimson text-white font-semibold shadow"
            >
              {t('btn_online_admission')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

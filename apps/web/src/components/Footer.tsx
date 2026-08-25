'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { GraduationCap, MapPin, Phone, Mail, Globe, Facebook, Youtube, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-nobel-navy-950 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-amber-500 text-nobel-navy-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white heading-serif tracking-tight">
              {t('college_name')}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {t('footer_desc')}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded bg-slate-800 hover:bg-amber-500 hover:text-nobel-navy-950 flex items-center justify-center transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Youtube"
              className="w-8 h-8 rounded bg-slate-800 hover:bg-amber-500 hover:text-nobel-navy-950 flex items-center justify-center transition"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 border-l-2 border-amber-500 pl-2">
            {lang === 'ne' ? 'मुख्य लिङ्कहरू' : 'Quick Navigation'}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                {t('nav_about')}
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-amber-400 transition">
                {t('nav_programs')}
              </Link>
            </li>
            <li>
              <Link href="/departments" className="hover:text-amber-400 transition">
                {t('nav_departments')}
              </Link>
            </li>
            <li>
              <Link href="/faculty" className="hover:text-amber-400 transition">
                {t('nav_faculty')}
              </Link>
            </li>
            <li>
              <Link href="/facilities" className="hover:text-amber-400 transition">
                {t('nav_facilities')}
              </Link>
            </li>
            <li>
              <Link href="/admission" className="hover:text-amber-400 transition">
                {t('btn_online_admission')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Information Bulletins */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 border-l-2 border-amber-500 pl-2">
            {lang === 'ne' ? 'सूचना तथा गतिविधि' : 'College Information'}
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/news" className="hover:text-amber-400 transition">
                {t('nav_news')}
              </Link>
            </li>
            <li>
              <Link href="/notices" className="hover:text-amber-400 transition">
                {t('nav_notices')}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-amber-400 transition">
                {lang === 'ne' ? 'फोटो तथा भिडियो ग्यालरी' : 'Photo & Video Gallery'}
              </Link>
            </li>
            <li>
              <Link href="/downloads" className="hover:text-amber-400 transition">
                {t('nav_downloads')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                {t('nav_contact')}
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-amber-400 transition text-xs opacity-75">
                {t('btn_staff_login')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-base mb-4 border-l-2 border-amber-500 pl-2">
            {lang === 'ne' ? 'कलेज सम्पर्क' : 'Campus Office'}
          </h3>
          <div className="flex items-start gap-3 text-sm text-slate-400">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <span>{t('location_tag')}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Phone className="w-5 h-5 text-amber-400 shrink-0" />
            <span>+977-44-500100</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Mail className="w-5 h-5 text-amber-400 shrink-0" />
            <span>info@nobelcollege.edu.np</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Globe className="w-5 h-5 text-amber-400 shrink-0" />
            <span>www.nobelcollege.edu.np</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>{t('footer_copyright')}</p>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Institutional Digital Platform v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

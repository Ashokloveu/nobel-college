'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  BookOpen,
  GraduationCap,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
  Laptop,
  CheckCircle2,
  Award,
  Calculator,
  Briefcase,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  level: 'BACHELOR' | 'DIPLOMA';
  duration: string;
  dept: string;
  feeTotal: number;
  description: string;
  curriculum: string[];
  careers: string[];
  icon: any;
  badgeColor: string;
}

const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'bca',
    title: 'Bachelor in Computer Application (BCA)',
    slug: 'bachelor-in-computer-application-bca',
    level: 'BACHELOR',
    duration: '4 Years (8 Semesters)',
    dept: 'Department of Science & Technology',
    feeTotal: 350000,
    description: 'Comprehensive 4-year computer application degree covering software engineering, full-stack web development, database systems, AI basics, and mobile app development.',
    curriculum: ['Semester 1: C Programming & Digital Logic', 'Semester 2: OOP in C++ & Discrete Math', 'Semester 3: Data Structure & Algorithms', 'Semester 4: Web Technologies & DBMS', 'Semester 5-8: Software Engineering & Capstone Project'],
    careers: ['Software Engineer', 'Web Developer', 'System Analyst', 'Database Admin', 'IT Project Manager'],
    icon: Laptop,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'bbs',
    title: 'Bachelor of Business Studies (BBS)',
    slug: 'bachelor-of-business-studies-bbs',
    level: 'BACHELOR',
    duration: '4 Years (Annual System)',
    dept: 'Department of Management Studies',
    feeTotal: 180000,
    description: 'Practical business management degree emphasizing financial accounting, corporate marketing, organizational behavior, tax laws, and business strategy.',
    curriculum: ['Year 1: Business English & Microeconomics', 'Year 2: Macroeconomics & Cost Accounting', 'Year 3: Financial Management & Marketing', 'Year 4: Corporate Governance & Business Research Project'],
    careers: ['Bank Officer', 'Marketing Executive', 'Accountant', 'HR Specialist', 'Financial Analyst'],
    icon: Building2,
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    id: 'science',
    title: '+2 Science Program',
    slug: 'plus-two-science',
    level: 'DIPLOMA',
    duration: '2 Years (Grade 11 & 12)',
    dept: 'Department of Science & Technology',
    feeTotal: 120000,
    description: 'Higher secondary science stream providing rigorous foundation in Physics, Chemistry, Mathematics/Biology, and Computer Science for medical & engineering careers.',
    curriculum: ['Grade 11: Physics, Chemistry, Mathematics/Biology, English', 'Grade 12: Advanced Physics, Organic Chemistry, Computer Science, Nepali'],
    careers: ['Foundation for MBBS (Medical)', 'Foundation for BE (Engineering)', 'Foundation for BSc CSIT / BCA', 'Biotechnology Studies'],
    icon: GraduationCap,
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'mgmt',
    title: '+2 Management Program',
    slug: 'plus-two-management',
    level: 'DIPLOMA',
    duration: '2 Years (Grade 11 & 12)',
    dept: 'Department of Management Studies',
    feeTotal: 95000,
    description: 'Higher secondary management curriculum preparing students for business administration, hotel management, accountancy, and corporate law.',
    curriculum: ['Grade 11: Accountancy, Economics, Business Studies, English', 'Grade 12: Advanced Accountancy, Hotel Mgmt/Computer Science, Business Math'],
    careers: ['Foundation for BBA / BBS', 'Foundation for BHM (Hotel Mgmt)', 'Chartered Accountancy (CA)', 'Business Entrepreneurship'],
    icon: Users,
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
];

export default function ProgramsPage() {
  const { lang, t } = useLanguage();
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'BACHELOR' | 'DIPLOMA'>('ALL');
  
  // Interactive Scholarship Fee Calculator State
  const [selectedProgId, setSelectedProgId] = useState('bca');
  const [seeGpaInput, setSeeGpaInput] = useState('3.60');

  const filteredPrograms = PROGRAMS_DATA.filter(
    (p) => levelFilter === 'ALL' || p.level === levelFilter
  );

  const currentProgForCalc = PROGRAMS_DATA.find((p) => p.id === selectedProgId) || PROGRAMS_DATA[0];
  const gpaVal = parseFloat(seeGpaInput) || 0;
  let scholarshipPercent = 0;
  if (gpaVal >= 3.6) scholarshipPercent = 50;
  else if (gpaVal >= 3.2) scholarshipPercent = 25;
  else if (gpaVal >= 2.8) scholarshipPercent = 15;

  const discountAmount = (currentProgForCalc.feeTotal * scholarshipPercent) / 100;
  const netPayableFee = currentProgForCalc.feeTotal - discountAmount;

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
                {lang === 'ne' ? 'शैक्षिक पाठ्यक्रमहरू' : 'Accredited Academic Curricula'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'हाम्रा अध्ययन कार्यक्रमहरू' : 'Academic Programs & Degrees'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजमा सञ्चालित उत्कृष्ट +२ विज्ञान, +२ व्यवस्थापन, बीसीए र बीबीएस कार्यक्रमहरू।'
                  : 'Affiliated Higher Secondary (+2 Science & Management) and University Undergraduate (BCA & BBS) degree options designed for modern global careers.'}
              </p>
            </div>
          </div>

          {/* Level Filter Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              {(['ALL', 'BACHELOR', 'DIPLOMA'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition ${
                    levelFilter === lvl
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {lvl === 'ALL'
                    ? (lang === 'ne' ? 'सबै कार्यक्रमहरू (All)' : 'All Degree Programs')
                    : lvl === 'BACHELOR'
                    ? (lang === 'ne' ? 'स्नातक तह (Bachelor Degrees)' : 'Bachelor Degrees (BCA, BBS)')
                    : (lang === 'ne' ? '+२ उच्च माध्यमिक (+2 Stream)' : '+2 Stream (+2 Science, +2 Mgmt)')}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900">{filteredPrograms.length}</strong> Accredited Programs
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((prog) => {
              const IconComp = prog.icon;
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-nobel-navy-950 text-amber-400 flex items-center justify-center font-bold shadow-lg group-hover:scale-105 transition transform">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${prog.badgeColor}`}>
                        {prog.level} DEGREE
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                        {prog.title}
                      </h2>
                      <div className="text-xs font-bold text-amber-600">
                        {prog.dept} • <span className="font-mono text-slate-700">{prog.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Curriculum Highlights */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase text-slate-500 block">
                        Curriculum Highlights:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {prog.curriculum.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career Opportunities */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase text-slate-500 block">
                        Career Outcomes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.careers.map((car, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            💼 {car}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fee & Action Bar */}
                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition Fee</span>
                      <span className="font-mono font-black text-nobel-navy-900 text-lg">
                        NPR {prog.feeTotal.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href="/admission"
                      className="px-6 py-3 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
                    >
                      {t('btn_online_admission')}
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🧮 INTERACTIVE MERIT SCHOLARSHIP & FEE CALCULATOR WIDGET */}
          <div className="bg-nobel-navy-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-nobel-navy-950 flex items-center justify-center font-bold shadow">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black heading-serif text-white">
                  {lang === 'ne' ? 'मेरिट छात्रवृत्ति तथा शुल्क क्याल्कुलेटर' : 'Interactive Tuition & Merit Scholarship Fee Calculator'}
                </h2>
                <p className="text-xs text-slate-300">
                  Select your program and enter your SEE/SLC GPA to calculate instant scholarship waivers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-300 mb-1">Target Academic Program *</label>
                <select
                  value={selectedProgId}
                  onChange={(e) => setSelectedProgId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-bold outline-none"
                >
                  <option value="bca">Bachelor in Computer Application (BCA)</option>
                  <option value="bbs">Bachelor of Business Studies (BBS)</option>
                  <option value="science">+2 Science Stream</option>
                  <option value="mgmt">+2 Management Stream</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-300 mb-1">SEE / SLC Overall GPA (1.0 - 4.0) *</label>
                <input
                  type="text"
                  value={seeGpaInput}
                  onChange={(e) => setSeeGpaInput(e.target.value)}
                  placeholder="e.g. 3.60"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm font-bold outline-none"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-1 text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Calculated Net Tuition Fee</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  NPR {netPayableFee.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold">
                  ✓ {scholarshipPercent}% Merit Discount Applied (Saved NPR {discountAmount.toLocaleString()})
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

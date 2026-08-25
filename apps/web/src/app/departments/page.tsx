'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Building2,
  Laptop,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Cpu,
  GraduationCap,
} from 'lucide-react';

interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  slug: string;
  head: string;
  headTitle: string;
  email: string;
  phone: string;
  description: string;
  programsOffered: string[];
  facilities: string[];
  icon: any;
}

const DEPARTMENTS_DATA: DepartmentItem[] = [
  {
    id: '1',
    name: 'Department of Science & Technology',
    code: 'DST',
    slug: 'department-of-science-and-technology',
    head: 'Prof. Dr. Ram Shrestha',
    headTitle: 'Principal & HOD Science',
    email: 'science@nobelcollege.edu.np',
    phone: '+977-44-500100',
    description: 'Directing higher secondary +2 Science and undergraduate Bachelor in Computer Application (BCA) degrees with state-of-the-art computer labs, physics/chemistry/biology research facilities, and software development suites.',
    programsOffered: ['Bachelor in Computer Application (BCA)', '+2 Science Stream'],
    facilities: ['High-Performance Computer Lab', 'Physics & Electronics Lab', 'Chemistry & Molecular Biology Lab', 'Smart Interactive Multimedia Classrooms'],
    icon: Laptop,
  },
  {
    id: '2',
    name: 'Department of Management Studies',
    code: 'DMS',
    slug: 'department-of-management-studies',
    head: 'Dr. Anita Sharma',
    headTitle: 'Head of Department',
    email: 'mgmt@nobelcollege.edu.np',
    phone: '+977-44-500101',
    description: 'Overseeing +2 Management and Bachelor of Business Studies (BBS) programs with focus on corporate accounting, marketing management, organizational behavior, financial planning, and entrepreneurship bootcamps.',
    programsOffered: ['Bachelor of Business Studies (BBS)', '+2 Management Stream'],
    facilities: ['Business Simulation Lab', 'Corporate Seminar Hall', 'Entrepreneurship Incubator', 'Central Financial Library'],
    icon: Building2,
  },
  {
    id: '3',
    name: 'Department of Humanities & General Education',
    code: 'DHG',
    slug: 'department-of-humanities-and-general-education',
    head: 'Prof. B. K. Mahato',
    headTitle: 'Senior Department Coordinator',
    email: 'humanities@nobelcollege.edu.np',
    phone: '+977-44-500102',
    description: 'Fostering linguistic proficiency in English & Nepali, communication skills, social research, cultural studies, and public speaking workshops across all academic programs.',
    programsOffered: ['General English & Communication', 'Nepalese Literature & Culture', 'Social Research Methodology'],
    facilities: ['Language Communication Lab', 'Auditorium & Debate Stage', 'Digital Audio-Visual Room'],
    icon: Users,
  },
];

export default function DepartmentsPage() {
  const { lang, t } = useLanguage();

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
                {lang === 'ne' ? 'शैक्षिक संरचना' : 'Academic Organization & Divisions'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'कलेजका विभागहरू' : 'College Departments'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजमा अध्यापन, अनुसन्धान र प्रविधि तालिम सञ्चालन गर्ने तीन प्रमुख विभागहरू।'
                  : 'Discover our core academic departments driving excellence in teaching, research, laboratory experiments, and technical training in Bardibas.'}
              </p>
            </div>
          </div>

          {/* Departments List */}
          <div className="space-y-8">
            {DEPARTMENTS_DATA.map((dept) => {
              const IconComp = dept.icon;
              return (
                <div
                  key={dept.id}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-nobel-navy-950 text-amber-400 flex items-center justify-center font-bold shadow-lg shrink-0">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                            {dept.name}
                          </h2>
                          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold border border-slate-200">
                            {dept.code}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-600">
                          {dept.headTitle}: {dept.head}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {dept.description}
                    </p>

                    {/* Programs Offered Badge List */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase text-slate-500 block">
                        Programs Offered:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {dept.programsOffered.map((prog, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-xl bg-blue-50 text-blue-900 font-bold text-xs border border-blue-200">
                            🎓 {prog}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Department Facilities */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-extrabold uppercase text-slate-500 block">
                        Laboratory & Special Facilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {dept.facilities.map((fac, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Head Contact Box */}
                  <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500 text-nobel-navy-950 flex items-center justify-center font-bold text-lg">
                        {dept.head.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{dept.head}</div>
                        <div className="text-[11px] text-amber-400 font-semibold">{dept.headTitle}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 font-mono">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{dept.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>{dept.email}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/departments/${dept.slug}`}
                        className="w-full py-2.5 rounded-xl bg-amber-500 text-nobel-navy-950 font-black text-xs hover:bg-amber-400 transition shadow flex items-center justify-center gap-2"
                      >
                        Department Overview →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

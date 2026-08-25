'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Users,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Search,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Briefcase,
  FileText,
} from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  department: 'Science & IT' | 'Management' | 'Humanities';
  qualification: string;
  experience: string;
  specialization: string;
  email: string;
  phone: string;
  photoUrl: string;
  publicationsCount: number;
}

const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: '1',
    name: 'Prof. Dr. Ram Shrestha',
    slug: 'prof-dr-ram-shrestha',
    designation: 'Principal / Campus Chief',
    department: 'Science & IT',
    qualification: 'Ph.D. in Computer Science & Applied Physics',
    experience: '22+ Years Leadership',
    specialization: 'Artificial Intelligence, Quantum Computing & Educational Management',
    email: 'principal@nobelcollege.edu.np',
    phone: '+977-9851000001',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 14,
  },
  {
    id: '2',
    name: 'Dr. Anita Sharma',
    slug: 'dr-anita-sharma',
    designation: 'HOD, Department of Management Studies',
    department: 'Management',
    qualification: 'Ph.D. in Financial Economics & Business Studies',
    experience: '16+ Years Academic',
    specialization: 'Corporate Finance, Capital Markets & Organizational Strategy',
    email: 'mgmt@nobelcollege.edu.np',
    phone: '+977-9841000102',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 9,
  },
  {
    id: '3',
    name: 'Er. Sujan Mahato',
    slug: 'er-sujan-mahato',
    designation: 'Senior Lecturer, IT & BCA Program Coordinator',
    department: 'Science & IT',
    qualification: 'M.Sc. in Computer Engineering & Software Systems',
    experience: '10+ Years Industry & Academic',
    specialization: 'Full-Stack Web Engineering, Database Systems & Cloud Infrastructure',
    email: 'sujan@nobelcollege.edu.np',
    phone: '+977-9801000103',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 6,
  },
  {
    id: '4',
    name: 'Prof. B. K. Mahato',
    slug: 'prof-bk-mahato',
    designation: 'Department Coordinator, Humanities & Languages',
    department: 'Humanities',
    qualification: 'M.Phil. in English & Applied Linguistics',
    experience: '18+ Years Academic',
    specialization: 'Professional Communication, Nepalese Cultural Studies & Public Speaking',
    email: 'humanities@nobelcollege.edu.np',
    phone: '+977-9854000104',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    publicationsCount: 8,
  },
];

export default function FacultyPage() {
  const { lang, t } = useLanguage();
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaculty = FACULTY_MEMBERS.filter((m) => {
    const matchesDept = deptFilter === 'ALL' || m.department === deptFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
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
                {lang === 'ne' ? 'शिक्षक तथा प्राध्यापक वर्ग' : 'Distinguished Faculty & Research Scholars'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'प्राध्यापक निर्देशिका' : 'Faculty & Scholars Directory'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजमा अध्यापन गराउनुहुने अनुभवी प्राध्यापक, अनुसन्धानकर्ता र शिक्षाविद्हरू।'
                  : 'Meet the dedicated professors, engineering scholars, and researchers driving academic excellence and mentorship in Bardibas.'}
              </p>
            </div>
          </div>

          {/* Search & Department Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {['ALL', 'Science & IT', 'Management', 'Humanities'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDeptFilter(dept)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                    deptFilter === dept
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dept === 'ALL' ? (lang === 'ne' ? 'सबै संकाय (All)' : 'All Departments') : dept}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by professor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
              />
            </div>
          </div>

          {/* Faculty Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFaculty.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-nobel-navy-950/90 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-800 shadow">
                      {m.department}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-nobel-navy-900 leading-snug">
                        {m.name}
                      </h3>
                      <div className="text-xs font-bold text-amber-600">
                        {m.designation}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {m.qualification}
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Briefcase className="w-3.5 h-3.5 text-nobel-navy-900" />
                        <span>{m.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{m.publicationsCount} Research Publications</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic pt-1 line-clamp-2">
                      Specialization: {m.specialization}
                    </p>
                  </div>
                </div>

                {/* Contact Footer Bar */}
                <div className="p-6 pt-0 space-y-3">
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{m.email}</span>
                    </div>
                  </div>

                  <Link
                    href={`/faculty/${m.slug}`}
                    className="w-full py-2.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-1.5"
                  >
                    View Academic Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

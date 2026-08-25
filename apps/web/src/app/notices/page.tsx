'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Bell,
  FileText,
  Download,
  Calendar,
  Sparkles,
  Search,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  X,
  Printer,
  Share2,
} from 'lucide-react';

interface NoticeItem {
  id: string;
  refNo: string;
  title: string;
  slug: string;
  category: 'ADMISSION' | 'EXAMINATION' | 'SCHOLARSHIP' | 'URGENT';
  date: string;
  bsDate: string;
  isImportant: boolean;
  isNew: boolean;
  authority: string;
  summary: string;
  fullBody: string;
  attachmentName: string;
}

const NOTICES_DATA: NoticeItem[] = [
  {
    id: '1',
    refNo: 'NMC/NOTICE/2026/08-101',
    title: 'Urgent: Entrance Examination Result & Merit Scholarship Tier List 2026',
    slug: 'entrance-examination-result-merit-scholarship-2026',
    category: 'URGENT',
    date: 'August 24, 2026',
    bsDate: '२०८३ भदौ ८ गते',
    isImportant: true,
    isNew: true,
    authority: 'Office of Campus Chief & Entrance Examination Board',
    summary: 'All applicants who appeared in the Computer-Based Entrance Examination can now log in to the Student Portal using their User ID (ENT-2026-000101) to download score cards and admit cards.',
    fullBody: 'Notice is hereby given to all prospective candidates of +2 Science, +2 Management, BCA, and BBS programs that the official Entrance Examination Merit List for Session 2026 has been published.\n\nCandidates scoring 80% and above in the entrance test have been awarded 50% tuition waiver under the College Merit Scholarship Scheme. All selected candidates are instructed to complete fee verification at the Accounts Desk by Bhadra 15, 2083.',
    attachmentName: 'Nobel_Entrance_Merit_List_2026.pdf',
  },
  {
    id: '2',
    refNo: 'NMC/NOTICE/2026/08-095',
    title: 'Class Schedule & Routine Notice for First Semester BCA & BBS Batch 2026',
    slug: 'first-semester-bca-bbs-class-routine-2026',
    category: 'EXAMINATION',
    date: 'August 18, 2026',
    bsDate: '२०८३ भदौ २ गते',
    isImportant: false,
    isNew: true,
    authority: 'Department of Computer Science & Business Management',
    summary: 'Regular morning classes for 1st Semester BCA and BBS students will commence from 06:15 AM starting Bhadra 10, 2083. Complete section routines are attached.',
    fullBody: 'This is to inform all newly admitted students of BCA and BBS 1st Semester that regular theory and lab classes will begin from Sunday, Bhadra 10, 2083.\n\nStudents must bring their official Admit Cards or Identity Proof until permanent Student ID Cards are distributed.',
    attachmentName: 'BCA_BBS_Class_Routine_Semester1.pdf',
  },
  {
    id: '3',
    refNo: 'NMC/NOTICE/2026/08-088',
    title: '+2 Science & Management Grade 11 Practical Laboratory Exam Schedule',
    slug: 'grade-11-practical-lab-exam-schedule-2026',
    category: 'EXAMINATION',
    date: 'August 10, 2026',
    bsDate: '२०८३ साउन २६ गते',
    isImportant: false,
    isNew: false,
    authority: 'Examination Control Division',
    summary: 'The Internal Practical Laboratory Examinations for Grade 11 Physics, Chemistry, Biology, and Computer Science will be held from Bhadra 1 to Bhadra 5.',
    fullBody: 'All Grade 11 Science students are notified to attend practical examinations in full lab coats with completed practical record files.',
    attachmentName: 'Grade11_Practical_Exam_Schedule.pdf',
  },
  {
    id: '4',
    refNo: 'NMC/NOTICE/2026/07-062',
    title: 'Application Notice for Madhesh Province Regional Merit Scholarship 2026',
    slug: 'madhesh-province-regional-merit-scholarship-2026',
    category: 'SCHOLARSHIP',
    date: 'July 28, 2026',
    bsDate: '२०८३ साउन १२ गते',
    isImportant: true,
    isNew: false,
    authority: 'Student Welfare & Scholarship Selection Committee',
    summary: 'Eligible students belonging to underprivileged, female, and rural municipal quotas can submit scholarship application forms along with municipality recommendation letters.',
    fullBody: 'Applications are invited for 20 seats of full tuition waiver under the Regional Empowerment Scholarship Scheme.',
    attachmentName: 'Scholarship_Application_Form_2026.pdf',
  },
];

import { getApiUrl } from '@/lib/storage';

export default function NoticesPage() {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(null);
  const [allNotices, setAllNotices] = useState<NoticeItem[]>(NOTICES_DATA);

  React.useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetch(getApiUrl('/api/v1/cms/notices'));
        const json = await res.json();
        if (res.ok && json.success && Array.isArray(json.data?.items)) {
          const apiNotices: NoticeItem[] = json.data.items.map((n: any, idx: number) => ({
            id: n._id || n.id || `api-${idx}`,
            refNo: `NMC/NOTICE/2026/${(n.category || 'GEN').toUpperCase()}-${idx + 100}`,
            title: n.title,
            slug: n.slug || n.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            category: (n.category?.toUpperCase() as any) || 'URGENT',
            date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'August 25, 2026',
            bsDate: '२०८३ भदौ',
            isImportant: Boolean(n.isImportant),
            isNew: true,
            authority: 'Office of Campus Administration',
            summary: n.content || n.title,
            fullBody: n.content || n.title,
            attachmentName: n.attachmentUrl ? 'Attached_Notice_Document.pdf' : 'Official_Notice.pdf',
          }));

          if (apiNotices.length > 0) {
            const existingTitles = new Set(apiNotices.map((n) => n.title));
            const defaultsFiltered = NOTICES_DATA.filter((d) => !existingTitles.has(d.title));
            setAllNotices([...apiNotices, ...defaultsFiltered]);
            return;
          }
        }
      } catch (err) {
        console.warn('API notice fetch offline, using persistent storage fallback:', err);
      }

      // Fallback to local storage
      try {
        const saved = localStorage.getItem('nobel_cms_notices');
        if (saved) {
          const custom: any[] = JSON.parse(saved);
          const formattedCustom: NoticeItem[] = custom.map((c, i) => ({
            id: c.id || `custom-${i}`,
            refNo: `NMC/NOTICE/2026/${c.category?.toUpperCase() || 'GEN'}-${c.id?.slice(-3) || '001'}`,
            title: c.title,
            slug: c.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'notice',
            category: (c.category?.toUpperCase() as any) || 'URGENT',
            date: c.date || new Date().toISOString().split('T')[0],
            bsDate: '२०८३ भदौ',
            isImportant: !!c.isImportant,
            isNew: true,
            authority: 'Office of Campus Administration',
            summary: c.title,
            fullBody: c.title,
            attachmentName: 'Official_Notice.pdf',
          }));
          const existingTitles = new Set(formattedCustom.map((n) => n.title));
          const defaultsFiltered = NOTICES_DATA.filter((d) => !existingTitles.has(d.title));
          setAllNotices([...formattedCustom, ...defaultsFiltered]);
        }
      } catch (err) {
        console.error('Failed to parse custom notices:', err);
      }
    loadNotices();
    window.addEventListener('storage', loadNotices);
    return () => window.removeEventListener('storage', loadNotices);
  }, []);

  const filteredNotices = allNotices.filter((n) => {
    const matchesCategory = categoryFilter === 'ALL' || n.category === categoryFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.refNo.toLowerCase().includes(searchQuery.toLowerCase());
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
                {lang === 'ne' ? 'आधिकारिक सूचना तथा निर्णयहरू' : 'Official Bulletins & Board Notices'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'क्याम्पस सूचना पाटी' : 'College Notice Board'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजका परीक्षा, भर्ना, छात्रवृत्ति र नियमित शैक्षिक सूचनाहरू।'
                  : 'Official announcements, entrance results, examination routines, fee notices, and scholarship bulletins issued by the Administration in Bardibas.'}
              </p>
            </div>
          </div>

          {/* 🚨 URGENT LIVE ANNOUNCEMENT TICKER */}
          <div className="bg-amber-50 border border-amber-300 p-4 sm:p-5 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-amber-950 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-nobel-navy-950 uppercase font-black tracking-wider inline-flex items-center gap-1.5 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 animate-bounce text-nobel-navy-950" />
                URGENT BULLETIN
              </span>
              <span className="truncate text-amber-900">
                {lang === 'ne'
                  ? 'प्रवेश परीक्षा नतिजा सार्वजनिक: ENT-2026-000101 प्रयोग गरी स्टुडेन्ट पोर्टलमा लगइन गर्नुहोस्।'
                  : 'Entrance Examination Result Published: Use ENT-2026-000101 to log in to Student Portal & download Admit Card.'}
              </span>
            </div>

            <Link
              href="/student-portal"
              className="px-4 py-2 rounded-xl bg-nobel-navy-900 text-amber-400 font-extrabold hover:bg-nobel-navy-800 transition shrink-0 flex items-center gap-1.5 shadow"
            >
              Student Portal →
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
              {['ALL', 'URGENT', 'EXAMINATION', 'ADMISSION', 'SCHOLARSHIP'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? (lang === 'ne' ? 'सबै सूचनाहरू (All)' : 'All Notices') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by title or Ref No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
              />
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className={`p-6 sm:p-8 rounded-3xl bg-white border shadow-md hover:shadow-xl transition duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                  n.isImportant ? 'border-l-8 border-l-amber-500 border-slate-200 bg-amber-50/20' : 'border-slate-200'
                }`}
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {n.refNo}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-nobel-navy-900 text-amber-400 font-extrabold text-[10px] uppercase">
                      {n.category}
                    </span>
                    {n.isImportant && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-nobel-navy-950 font-black text-[10px] uppercase">
                        CRITICAL NOTICE
                      </span>
                    )}
                    {n.isNew && (
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] uppercase animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => setActiveNoticeModal(n)}
                    className="text-xl sm:text-2xl font-black text-nobel-navy-900 heading-serif leading-snug cursor-pointer hover:text-nobel-crimson transition"
                  >
                    {n.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {n.summary}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {n.date} ({n.bsDate})
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">Issued by: <strong>{n.authority}</strong></span>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-none border-slate-100">
                  <button
                    onClick={() => setActiveNoticeModal(n)}
                    className="w-full lg:w-44 py-2.5 px-4 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    Read Official Text
                  </button>

                  <Link
                    href="/downloads"
                    className="w-full lg:w-44 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition border border-slate-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    Download PDF
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 📜 OFFICIAL NOTICE FULL TEXT MODAL */}
          {activeNoticeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-6 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setActiveNoticeModal(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Letterhead */}
                <div className="border-b-2 border-nobel-navy-900 pb-4 text-center space-y-1">
                  <div className="text-xs font-bold text-nobel-crimson uppercase tracking-widest">
                    Nobel Multiple College • Bardibas, Mahottari
                  </div>
                  <h3 className="text-xl font-black text-nobel-navy-900 heading-serif">
                    Official Administration Notice
                  </h3>
                  <div className="font-mono text-xs text-slate-500">Ref: {activeNoticeModal.refNo}</div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Date: {activeNoticeModal.date} ({activeNoticeModal.bsDate})</span>
                    <span className="font-bold text-amber-600">{activeNoticeModal.category}</span>
                  </div>

                  <h4 className="text-lg font-bold text-nobel-navy-900 heading-serif">
                    {activeNoticeModal.title}
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 whitespace-pre-line leading-relaxed text-slate-700">
                    {activeNoticeModal.fullBody}
                  </div>

                  {/* Issuing Stamp Footer */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-extrabold text-nobel-navy-900">{activeNoticeModal.authority}</div>
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Campus Official Document
                      </div>
                    </div>

                    <Link
                      href="/downloads"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-nobel-navy-950 font-black text-xs hover:bg-amber-400 transition shadow flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download PDF Attachment
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

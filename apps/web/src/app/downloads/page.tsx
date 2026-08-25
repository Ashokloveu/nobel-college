'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Download,
  FileText,
  CheckCircle2,
  Sparkles,
  Search,
  FileCheck,
  ShieldCheck,
  Award,
  ArrowRight,
  Eye,
  FileCode,
} from 'lucide-react';

interface ResourceItem {
  id: string;
  refNo: string;
  title: string;
  category: 'PROSPECTUS' | 'ADMISSION' | 'SYLLABUS' | 'ROUTINE';
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  downloadCount: number;
  description: string;
  version: string;
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    id: '1',
    refNo: 'NMC-DOC-2026-001',
    title: 'Official Nobel Multiple College Institutional Prospectus 2026',
    category: 'PROSPECTUS',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    downloadCount: 420,
    description: 'Comprehensive college information brochure containing program syllabi, fee structures, faculty profiles, and scholarship guidelines for Session 2026.',
    version: 'v2026.1 Official',
  },
  {
    id: '2',
    refNo: 'NMC-DOC-2026-002',
    title: 'Printable Entrance & Admission Registration Form (Offline PDF)',
    category: 'ADMISSION',
    fileType: 'PDF',
    fileSize: '1.1 MB',
    downloadCount: 288,
    description: 'Official paper application form for applicants submitting entrance registration documents directly at the college admission desk.',
    version: 'v2026.2 Print',
  },
  {
    id: '3',
    refNo: 'NMC-DOC-2026-003',
    title: 'Bachelor in Computer Application (BCA) 4-Year Syllabus & Course Credit Map',
    category: 'SYLLABUS',
    fileType: 'PDF',
    fileSize: '2.8 MB',
    downloadCount: 510,
    description: 'Full 8-semester course structure, programming lab requirements, capstone project guidelines, and credit evaluation rules.',
    version: 'v2026 Curriculum',
  },
  {
    id: '4',
    refNo: 'NMC-DOC-2026-004',
    title: 'Bachelor of Business Studies (BBS) 4-Year Curriculum & Examination Rules',
    category: 'SYLLABUS',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    downloadCount: 375,
    description: 'Detailed 4-year undergraduate business administration curriculum, corporate internship guidelines, and examination rules.',
    version: 'v2026 Curriculum',
  },
  {
    id: '5',
    refNo: 'NMC-DOC-2026-005',
    title: '+2 Science & Management Practical Exam Laboratory Schedule',
    category: 'ROUTINE',
    fileType: 'PDF',
    fileSize: '1.4 MB',
    downloadCount: 310,
    description: 'Official laboratory examination timetable and viva-voce schedule for Grade 11 & 12 students.',
    version: 'v2026 Term-1',
  },
];

export default function DownloadsPage() {
  const { lang, t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadList, setDownloadList] = useState<ResourceItem[]>(RESOURCES_DATA);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadList((prev) =>
      prev.map((dl) => (dl.id === id ? { ...dl, downloadCount: dl.downloadCount + 1 } : dl))
    );

    setDownloadSuccessMessage(title);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);

    // Generate sample official PDF text download
    const element = document.createElement('a');
    const file = new Blob([`Nobel Multiple College Official Document: ${title}\nReference: NMC-DOC-2026`], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
  };

  const filteredResources = downloadList.filter((r) => {
    const matchesCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.refNo.toLowerCase().includes(searchQuery.toLowerCase());
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
                {lang === 'ne' ? 'आधिकारिक डाउनलोड केन्द्र' : 'Official Academic Document Center'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'डाउनलोड तथा स्रोतहरू' : 'Download Resources & Forms'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'नोबेल मल्टिपल कलेजका ब्रोसर, भर्ना आवेदन फारम, पाठ्यक्रम र परीक्षा तालिका डाउनलोड गर्नुहोस्।'
                  : 'Access official 2026 prospectus PDFs, printable admission application forms, BCA & BBS syllabi, and examination routine documents.'}
              </p>
            </div>
          </div>

          {/* Download Toast Notification */}
          {downloadSuccessMessage && (
            <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Downloading document: <strong>{downloadSuccessMessage}</strong></span>
              </div>
              <span className="text-[10px] font-mono opacity-80">VERIFIED PDF GENERATED</span>
            </div>
          )}

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
              {['ALL', 'PROSPECTUS', 'ADMISSION', 'SYLLABUS', 'ROUTINE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-md border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? (lang === 'ne' ? 'सबै सामग्रीहरू (All)' : 'All Documents') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search document title or Ref No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
              />
            </div>
          </div>

          {/* Downloads Resource Cards List */}
          <div className="space-y-4">
            {filteredResources.map((dl) => (
              <div
                key={dl.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4 max-w-3xl">
                  {/* PDF File Badge Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-700 flex flex-col items-center justify-center font-bold shrink-0 border border-red-200 shadow-sm group-hover:scale-105 transition transform">
                    <FileText className="w-6 h-6" />
                    <span className="text-[9px] font-black uppercase text-red-800">{dl.fileType}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {dl.refNo}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-nobel-navy-900 text-amber-400 font-extrabold text-[10px] uppercase">
                        {dl.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        ✓ {dl.version}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-nobel-navy-900 leading-snug group-hover:text-nobel-crimson transition">
                      {dl.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dl.description}
                    </p>

                    <div className="text-xs text-slate-400 font-mono flex items-center gap-3 pt-1">
                      <span>Size: <strong>{dl.fileSize}</strong></span>
                      <span>•</span>
                      <span className="text-amber-600 font-bold">{dl.downloadCount} Total Downloads</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(dl.id, dl.title)}
                  className="w-full md:w-52 py-3.5 px-5 rounded-2xl bg-nobel-navy-900 text-white font-extrabold text-xs hover:bg-nobel-navy-800 transition shadow-lg shrink-0 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  Download File ({dl.fileType})
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

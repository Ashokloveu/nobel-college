'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Calendar,
  Compass,
  Target,
  HeartHandshake,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Laptop,
  Library,
  Trophy,
  Download,
  FileText,
  UserCheck,
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2014',
    titleEn: 'College Establishment in Bardibas',
    titleNe: 'बर्दिबासमा कलेज स्थापना',
    descEn: 'Nobel Multiple College was founded by leading educationists to bring quality higher education to Mahottari district.',
    descNe: 'महोत्तरी जिल्लामा गुणस्तरीय उच्च शिक्षा पुर्‍याउन प्रमुख शिक्षाविद्हरूद्वारा कलेजको स्थापना।',
  },
  {
    year: '2017',
    titleEn: '+2 Science & Management Accreditation',
    titleNe: '+२ विज्ञान तथा व्यवस्थापन सम्बन्धन',
    descEn: 'Expansion into higher secondary education with state-of-the-art physics, chemistry, and biology laboratories.',
    descNe: 'सुविधायुक्त भौतिक, रासायनिक र जीवविज्ञान प्रयोगशालासहित उच्च माध्यमिक शिक्षा विस्तार।',
  },
  {
    year: '2021',
    titleEn: 'BCA (Bachelor in Computer Application) Launch',
    titleNe: 'बी.सी.ए. (BCA) कार्यक्रम सञ्चालन',
    descEn: 'Introduced 4-year university undergraduate BCA IT degree to bridge the digital skills gap in Madhesh Province.',
    descNe: 'मधेश प्रदेशमा डिजिटल प्रविधि र आईटी जनशक्ति उत्पादनका लागि ४ वर्षे बी.सी.ए. कार्यक्रम।',
  },
  {
    year: '2024',
    titleEn: 'Smart Digital Campus Initiative',
    titleNe: 'स्मार्ट डिजिटल क्याम्पस पहल',
    descEn: 'Constructed advanced IT labs, high-speed fiber network, and multimedia interactive smart classrooms.',
    descNe: 'उच्च गतिको फाइबर इन्टरनेट र मल्टीमीडिया स्मार्ट कक्षाकोठासहित आधुनिक आईटी ल्याब निर्माण।',
  },
  {
    year: '2026',
    titleEn: 'Full Digital Platform & E-Governance Launch',
    titleNe: 'ई-गभर्नेन्स र अनलाइन भर्ना प्रणाली',
    descEn: 'Launched end-to-end digital admission CRM, student portal, entrance exam engine, and online fee payment system.',
    descNe: 'अनलाइन प्रवेश परीक्षा, विद्यार्थी पोर्टल र डिजिटल भुक्तानीसहित पूर्ण ई-गभर्नेन्स प्रणाली।',
  },
];

const GALLERY_SLIDES = [
  {
    title: 'Main Academic Campus Building',
    category: 'Architecture',
    image: '/images/hero-campus.jpg',
    desc: 'Modern 4-story academic block equipped with spacious lecture halls and administrative offices in Bardibas.',
  },
  {
    title: 'High-Tech Computer & Software Lab',
    category: 'IT Lab',
    image: '/images/computer-lab.jpg',
    desc: 'State-of-the-art computer lab with high-speed internet, programming suites, and dedicated BCA workstations.',
  },
  {
    title: 'Central Reference Library',
    category: 'Knowledge Hub',
    image: '/images/library.jpg',
    desc: 'Stocked with thousands of course textbooks, academic journals, e-learning resources, and quiet study rooms.',
  },
];

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const [activeTimeline, setActiveTimeline] = useState<number>(4);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          
          {/* 1. HERO TITLE BANNER WITH DYNAMIC GRADIENT & PROSPECTUS DOWNLOAD */}
          <div className="bg-gradient-to-r from-nobel-navy-950 via-nobel-navy-900 to-nobel-navy-800 text-white p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ne' ? 'संस्थागत परिचय' : 'Institutional Profile & Legacy'}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black heading-serif leading-tight">
                {lang === 'ne' ? 'नोबेल मल्टिपल कलेजको बारेमा' : 'About Nobel Multiple College'}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {lang === 'ne'
                  ? 'बर्दिबास, महोत्तरी, मधेश प्रदेशमा उच्च गुणस्तरीय विज्ञान, व्यवस्थापन र प्रविधि शिक्षा प्रदान गर्ने अग्रणी कलेज।'
                  : 'A premier educational institution in Bardibas, Mahottari, Madhesh Province, dedicated to academic brilliance, scientific inquiry, and technological empowerment.'}
              </p>
            </div>

            {/* 1-Click Prospectus Download Button */}
            <div className="relative z-10 shrink-0 w-full sm:w-auto">
              <a
                href="/downloads"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 text-nobel-navy-950 font-black text-sm hover:bg-amber-400 transition shadow-xl flex items-center justify-center gap-3 group"
              >
                <Download className="w-5 h-5 text-nobel-navy-950 group-hover:translate-y-0.5 transition" />
                <span>{lang === 'ne' ? 'ब्रोसर / कलेज विवरण पुस्तक (PDF)' : 'Download 2026 Prospectus (PDF)'}</span>
              </a>
            </div>
          </div>

          {/* 2. DYNAMIC LIVE STATS BAR */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-4xl font-black text-nobel-navy-900 font-mono">2014</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'ne' ? 'स्थापना वर्ष' : 'Year Established'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-nobel-crimson font-mono">1000+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'ne' ? 'अध्ययनरत विद्यार्थीहरू' : 'Enrolled Students'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-amber-600 font-mono">98.4%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'ne' ? 'उत्तीर्ण सफलता दर' : 'Graduation Success Rate'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-emerald-600 font-mono">50+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'ne' ? 'अनुभवी शिक्षक तथा प्राध्यापक' : 'Expert Faculty Members'}
              </div>
            </div>
          </div>

          {/* 3. DYNAMIC MISSION & VISION CARDS WITH HOVER EFFECTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 space-y-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-nobel-navy-900 text-amber-400 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition transform">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                {lang === 'ne' ? 'हाम्रो उद्देश्य (Our Mission)' : 'Our Institutional Mission'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'ne'
                  ? 'नेपाल र विश्वस्तरमा प्रतिस्पर्धा गर्न सक्ने दक्ष, नैतिकवान र प्रविधियुक्त जनशक्ति निर्माणका लागि व्यावहारिक र अनुसन्धानमुखी शिक्षा प्रदान गर्नु।'
                  : 'To deliver academic excellence through modern teaching methodologies, practical laboratory research, and digital skills training—preparing students of Madhesh Province to excel nationally and globally.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ne' ? 'गुणस्तरीय र व्यवहारिक शिक्षा' : 'Quality & Practical Education Focus'}</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 space-y-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-2xl bg-nobel-crimson text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition transform">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                {lang === 'ne' ? 'हाम्रो दृष्टि (Our Vision)' : 'Our Vision for Tomorrow'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'ne'
                  ? 'पूर्वी नेपालमा शैक्षिक नवीनता, प्रविधि विकास र सामाजिक रूपान्तरणको नमुना उच्च शिक्षा केन्द्र बन्ने।'
                  : 'To stand as the benchmark institution of higher education in Eastern Nepal, renowned for academic innovation, digital literacy, ethical leadership, and social transformation.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-nobel-crimson">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ne' ? 'पूर्वी नेपालको अग्रणी केन्द्र' : 'Benchmark Center in Eastern Nepal'}</span>
              </div>
            </div>
          </div>

          {/* 4. DYNAMIC INTERACTIVE TIMELINE / MILESTONES */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-widest block">
                {lang === 'ne' ? 'हाम्रो ऐतिहासिक यात्रा' : 'Our Journey & Key Milestones'}
              </span>
              <h2 className="text-3xl font-black text-nobel-navy-900 heading-serif">
                {lang === 'ne' ? 'विकास र सफलताका कोशेढुङ्गाहरू' : 'Decade of Educational Growth'}
              </h2>
            </div>

            {/* Timeline Year Tabs */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {TIMELINE_EVENTS.map((event, idx) => (
                <button
                  key={event.year}
                  onClick={() => setActiveTimeline(idx)}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs transition shrink-0 ${
                    activeTimeline === idx
                      ? 'bg-nobel-navy-900 text-amber-400 shadow-lg border border-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {event.year}
                </button>
              ))}
            </div>

            {/* Selected Timeline Card */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-3 max-w-2xl mx-auto animate-in fade-in duration-300">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500 text-nobel-navy-950 text-xs font-black">
                Year {TIMELINE_EVENTS[activeTimeline].year}
              </div>
              <h3 className="text-xl font-bold text-nobel-navy-900">
                {lang === 'ne' ? TIMELINE_EVENTS[activeTimeline].titleNe : TIMELINE_EVENTS[activeTimeline].titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'ne' ? TIMELINE_EVENTS[activeTimeline].descNe : TIMELINE_EVENTS[activeTimeline].descEn}
              </p>
            </div>
          </div>

          {/* 5. INTERACTIVE CAMPUS VIRTUAL TOUR SHOWCASE */}
          <div className="bg-nobel-navy-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block">
                  {lang === 'ne' ? 'भौतिक संरचना तथा पूर्वाधार' : 'Interactive Campus Virtual Showcase'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black heading-serif text-white mt-1">
                  {lang === 'ne' ? 'आधुनिक क्याम्पस पूर्वाधार' : 'State-of-the-Art Learning Facilities'}
                </h2>
              </div>

              {/* Slide Buttons */}
              <div className="flex items-center gap-2">
                {GALLERY_SLIDES.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeSlide === idx
                        ? 'bg-amber-500 text-nobel-navy-950 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {slide.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Campus Image Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 h-72 sm:h-96 group">
                <img
                  src={GALLERY_SLIDES[activeSlide].image}
                  alt={GALLERY_SLIDES[activeSlide].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-extrabold uppercase border border-amber-500/30">
                  {GALLERY_SLIDES[activeSlide].category}
                </span>
                <h3 className="text-2xl font-bold text-white heading-serif">
                  {GALLERY_SLIDES[activeSlide].title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {GALLERY_SLIDES[activeSlide].desc}
                </p>
                <div className="pt-2">
                  <Link
                    href="/facilities"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-nobel-navy-950 font-black text-xs hover:bg-amber-400 transition shadow"
                  >
                    {lang === 'ne' ? 'सबै भौतिक पूर्वाधारहरू हेर्नुहोस्' : 'Explore All Campus Facilities'} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 6. CORE INSTITUTIONAL VALUES GRID */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-widest block">
                {lang === 'ne' ? 'हाम्रा मूल मान्यताहरू' : 'Core Values & Principles'}
              </span>
              <h2 className="text-3xl font-black text-nobel-navy-900 heading-serif">
                {lang === 'ne' ? 'शिक्षाका आधारभूत सिद्धान्तहरू' : 'What Drives Nobel Multiple College'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-nobel-navy-900">
                  {lang === 'ne' ? 'प्रविधि र नवप्रवर्तन' : 'Technological Innovation'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'प्रत्येक विषयमा प्रविधिको प्रयोग र आधुनिक कम्प्युटर प्रयोगशालाद्वारा सिकाइ।'
                    : 'Integrating software tools, coding labs, and digital smart boards across all faculties.'}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-nobel-navy-900">
                  {lang === 'ne' ? 'सामाजिक उत्तरदायित्व' : 'Community & Social Impact'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'महत्त्वपूर्ण सामाजिक र शैक्षिक विकासमा विद्यार्थीहरूको सक्रिय सहभागिता।'
                    : 'Encouraging student volunteerism, community health camps, and regional literacy drives.'}
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-nobel-navy-900">
                  {lang === 'ne' ? 'नैतिक नेतृत्व र अनुशासन' : 'Ethical Leadership & Discipline'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'उच्च नैतिक मूल्य र अनुशासनसहितको नेतृत्व क्षमता विकास।'
                    : 'Instilling moral integrity, professional ethics, and disciplined academic habits.'}
                </p>
              </div>
            </div>
          </div>

          {/* 7. ADMISSION CTA BANNER */}
          <div className="bg-gradient-to-r from-nobel-crimson-700 to-nobel-crimson text-white p-10 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold heading-serif">
              {lang === 'ne' ? 'नोबेल मल्टिपल कलेजमा भर्ना हुनुहोस्' : 'Join Nobel Multiple College Family Today'}
            </h2>
            <p className="text-sm text-red-100 max-w-2xl mx-auto">
              {lang === 'ne'
                ? '+२ विज्ञान, +२ व्यवस्थापन, बिसीए र बिबिएसमा अनलाइन भर्ना आवेदन खुला छ।'
                : 'Online applications are open for +2 Science, +2 Management, BCA, and BBS programs.'}
            </p>
            <div>
              <Link
                href="/admission"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-nobel-crimson-800 font-extrabold text-sm hover:bg-amber-400 transition shadow-xl"
              >
                {t('btn_online_admission')} →
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

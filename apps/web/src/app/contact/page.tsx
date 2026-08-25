'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  MessageSquare,
  Building2,
  Sparkles,
  ShieldCheck,
  User,
  PhoneCall,
  Globe,
} from 'lucide-react';
import { apiFetch, readApiJson } from '@/lib/storage';

interface DepartmentContact {
  id: string;
  nameEn: string;
  nameNe: string;
  head: string;
  phone: string;
  email: string;
}

const DEPARTMENTS_CONTACT: DepartmentContact[] = [
  {
    id: 'ADM',
    nameEn: 'General Admissions & Counselling Desk',
    nameNe: 'सामान्य भर्ना तथा परामर्श शाखा',
    head: 'Admission Officer Hari Sharma',
    phone: '+977-9854000101',
    email: 'admission@nobelcollege.edu.np',
  },
  {
    id: 'SCIENCE',
    nameEn: 'Department of Science & Technology (+2 & BCA)',
    nameNe: 'विज्ञान तथा प्रविधि विभाग (+२ र BCA)',
    head: 'Prof. Dr. Ram Shrestha',
    phone: '+977-44-500100',
    email: 'science@nobelcollege.edu.np',
  },
  {
    id: 'MGMT',
    nameEn: 'Department of Management Studies (+2 & BBS)',
    nameNe: 'व्यवस्थापन अध्ययन विभाग (+२ र BBS)',
    head: 'Dr. Anita Sharma',
    phone: '+977-44-500101',
    email: 'mgmt@nobelcollege.edu.np',
  },
  {
    id: 'ACCOUNTS',
    nameEn: 'Accounts & Fee Clearance Desk',
    nameNe: 'लेखा तथा शुल्क शाखा',
    head: 'Finance Controller B. K. Karna',
    phone: '+977-44-500102',
    email: 'accounts@nobelcollege.edu.np',
  },
];

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('ADM');
  const [isOfficeOpen, setIsOfficeOpen] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Calculate live office status based on current Nepal Time (6 AM - 5 PM Sunday-Friday)
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    if (day !== 6 && hour >= 6 && hour < 17) {
      setIsOfficeOpen(true);
    } else {
      setIsOfficeOpen(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      const response = await apiFetch('/api/v1/contacts', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          subject: `[${selectedDept}] ${formData.subject}`,
        }),
      });
      const json: any = await readApiJson(response);
      setSubmittedRef(json.data?.referenceNumber || json.data?._id || `MSG-${new Date().getFullYear()}`);
    } catch (error: any) {
      setSubmitError(error.message || 'Your message could not be saved. Please try again.');
    }
  };

  const activeDeptObj = DEPARTMENTS_CONTACT.find((d) => d.id === selectedDept) || DEPARTMENTS_CONTACT[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-nobel-crimson/10 text-nobel-crimson border border-nobel-crimson/20 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ne' ? 'सम्पर्क तथा ठेगाना' : 'Campus Location & Help Desk'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-nobel-navy-900 heading-serif">
              {lang === 'ne' ? 'नोबेल मल्टिपल कलेज सम्पर्क' : 'Contact Nobel Multiple College'}
            </h1>
            <p className="text-slate-600 text-base">
              Bardibas-3, Mahottari, Madhesh Province, Nepal
            </p>
          </div>

          {/* Live Office Status & Quick Action Calling Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full ${isOfficeOpen ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-400 block">Live Campus Office Status</span>
                <span className="text-sm font-bold text-slate-900">
                  {isOfficeOpen
                    ? (lang === 'ne' ? 'क्याम्पस कार्यालय खुल्ला छ (विहान ६:०० देखि बेलुका ५:०० सम्म)' : 'Campus Office is Open (06:00 AM – 05:00 PM)')
                    : (lang === 'ne' ? 'कार्यालय हाल बन्द छ (भोलि बिहान ६:०० बजे खुल्नेछ)' : 'Campus Office Currently Closed (Opens 06:00 AM)')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:+97744500100"
                className="px-5 py-2.5 rounded-xl bg-nobel-navy-900 text-amber-400 font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                {lang === 'ne' ? 'फोन सम्पर्क (+९७७-४४-५००१००)' : 'Call Hotline (+977-44-500100)'}
              </a>
              <a
                href="https://wa.me/9779854000101"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Department Contact Selector Tabs */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-nobel-navy-900 heading-serif">
              {lang === 'ne' ? 'विशिष्ट विभाग सम्पर्क शाखा छान्नुहोस्' : 'Select Department Inquiry Desk'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEPARTMENTS_CONTACT.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`p-5 rounded-2xl border-2 text-left transition space-y-2 ${
                    selectedDept === dept.id
                      ? 'border-nobel-navy-900 bg-nobel-navy-950 text-white shadow-lg'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase text-amber-400 block">{dept.id} DESK</span>
                  <div className="font-bold text-xs leading-snug">
                    {lang === 'ne' ? dept.nameNe : dept.nameEn}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Department Officer Badge */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950 font-medium">
              <div>
                Desk Head Officer: <strong>{activeDeptObj.head}</strong> • Phone: <strong className="font-mono">{activeDeptObj.phone}</strong>
              </div>
              <div className="font-mono text-amber-800">Email: {activeDeptObj.email}</div>
            </div>
          </div>

          {/* Main Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Campus Location & Hours Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-nobel-navy-900 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-slate-800">
                <h2 className="text-2xl font-bold heading-serif text-amber-400">
                  {lang === 'ne' ? 'क्याम्पस ठेगाना र विवरण' : 'Campus Location & Hours'}
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Nobel Multiple College</span>
                      <span>Bardibas-3, Mahottari, Madhesh Province, Nepal</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">GPS Coordinates: 26.9854° N, 85.9015° E</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>+977-44-500100 / +977-9854000101</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>info@nobelcollege.edu.np</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Sunday – Friday: 06:00 AM – 05:00 PM (Saturday Closed)</span>
                  </div>
                </div>

                {/* Google Map Quick Directions Button */}
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Bardibas+Mahottari+Nepal"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-amber-500 text-nobel-navy-950 font-black text-xs hover:bg-amber-400 transition shadow flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    {lang === 'ne' ? 'गुगल म्यापमा दिशा हेर्नुहोस्' : 'Open Directions in Google Maps App'}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
              {submittedRef ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 heading-serif">
                    {lang === 'ne' ? 'सन्देश प्राप्त भयो!' : 'Message Received Successfully!'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Your inquiry reference number is <strong className="font-mono bg-slate-100 px-2 py-1 rounded text-nobel-navy-900 border border-slate-300">{submittedRef}</strong>.
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    An admission officer from the {activeDeptObj.nameEn} desk will contact you within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
                      {submitError}
                    </div>
                  )}
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-nobel-navy-900 heading-serif">
                      Send Direct Message to {activeDeptObj.nameEn}
                    </h3>
                    <p className="text-slate-500">Fill out your contact details below</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sujan Mahato"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Mobile Phone Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="+977-98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase mb-1">Inquiry Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Admission Fee Structure & Scholarship"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Your Detailed Query *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your question regarding courses, SEE GPA criteria, or hostel facilities..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-nobel-navy-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow-lg flex items-center justify-center gap-2"
                  >
                    Send Message to {activeDeptObj.id} Desk
                    <Send className="w-4 h-4 text-amber-400" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 🗺️ INTERACTIVE EMBEDDED GOOGLE MAP SECTION */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-widest block">
                  {lang === 'ne' ? 'क्याम्पस म्याप नक्सा' : 'Interactive Campus Map Location'}
                </span>
                <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                  {lang === 'ne' ? 'बर्दिबास, महोत्तरी क्याम्पस गुगल म्याप' : 'Nobel Multiple College on Google Maps'}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-nobel-crimson" />
                <span>Bardibas-3, Mahottari, Madhesh Province</span>
              </div>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
              <iframe
                title="Nobel Multiple College Bardibas Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14258.831825700777!2d85.892015!3d26.985412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4bf41870a595%3A0x6b1076b107062400!2sBardibas%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  UserCheck,
  Award,
  CheckCircle2,
  Clock,
  Calendar,
  Download,
  LogIn,
  Search,
  Sparkles,
  Printer,
  ShieldCheck,
  MapPin,
  Trophy,
  GraduationCap,
  Lock,
  LogOut,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface StudentRecord {
  id: string;
  refCode: string;
  dobBS: string;
  name: string;
  guardianName: string;
  program: string;
  photoUrl?: string;
  candidateSignatureUrl?: string;
  principalSignatureUrl?: string;
  type: 'ENTRANCE_APPLICANT' | 'ENROLLED_STUDENT';
  entranceStatus?: 'SUBMITTED' | 'VERIFIED_APPROVED' | 'REJECTED';
  symbolNumber?: string;
  examDate?: string;
  examHall?: string;
  entranceScore?: number;
  entranceRank?: string;
  scholarshipOffer?: string;
  gpa?: string;
  attendance?: string;
  feeStatus?: string;
}

const DATABASE_RECORDS: Record<string, StudentRecord> = {
  'ENT-2026-000101': {
    id: '1',
    refCode: 'ENT-2026-000101',
    dobBS: '2062-05-12',
    name: 'Sujan Mahato',
    guardianName: 'Ram Kumar Mahato',
    program: 'Bachelor in Computer Application (BCA)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    candidateSignatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
    principalSignatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
    type: 'ENTRANCE_APPLICANT',
    entranceStatus: 'VERIFIED_APPROVED',
    symbolNumber: 'NMC-SYM-2026-042',
    examDate: 'September 10, 2026 (11:00 AM)',
    examHall: 'Main Academic Hall - Room 102',
    entranceScore: 88,
    entranceRank: 'Rank #4 in Merit List',
    scholarshipOffer: '100% Full Merit Tuition Scholarship Qualified',
  },
  'ENT-2026-000102': {
    id: '2',
    refCode: 'ENT-2026-000102',
    dobBS: '2062-08-20',
    name: 'Pooja Raut',
    guardianName: 'Shyam Raut',
    program: '+2 Science Stream',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    type: 'ENTRANCE_APPLICANT',
    entranceStatus: 'SUBMITTED',
  },
  'NMC-2026-0042': {
    id: '3',
    refCode: 'NMC-2026-0042',
    dobBS: '2061-02-10',
    name: 'Amit Kumar Karna',
    guardianName: 'B. K. Karna',
    program: 'BCA 2nd Semester',
    type: 'ENROLLED_STUDENT',
    gpa: '3.85 / 4.0',
    attendance: '94.2%',
    feeStatus: 'PAID',
  },
};

export default function StudentPortalPage() {
  // Login Form States
  const [refInput, setRefInput] = useState('');
  const [dobInput, setDobInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRecord, setActiveRecord] = useState<StudentRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [portalTab, setPortalTab] = useState<'ADMIT_CARD' | 'ENTRANCE_RESULT' | 'GRADEBOOK'>('ADMIT_CARD');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const userKey = refInput.trim().toUpperCase();
    const dob = dobInput.trim();

    if (DATABASE_RECORDS[userKey]) {
      const record = DATABASE_RECORDS[userKey];
      if (record.dobBS === dob) {
        setActiveRecord(record);
        setIsLoggedIn(true);
      } else {
        setErrorMsg('Invalid Date of Birth for this User ID. Please check your credentials.');
      }
    } else {
      setErrorMsg('Invalid User ID / Application Reference Code. Record not found.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveRecord(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hide Header & Footer during Window Print */}
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 py-8 sm:py-12 print:p-0">
        <div className="max-w-4xl mx-auto px-4 space-y-8 print:max-w-none print:p-0">
          
          {/* Header Banner (Hidden on Print) */}
          <div className="text-center space-y-3 print:hidden">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-nobel-navy-900" />
              Student & Parent Information Gateway
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-nobel-navy-900 heading-serif">
              Student Entrance & Academic Portal
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Login using your Entrance Application Reference Code (User ID) and Date of Birth to check verification status, download official Admit Cards with photo & signatures, and view entrance results.
            </p>
          </div>

          {/* 1. LOGIN SCREEN FORM (WHEN NOT LOGGED IN) */}
          {!isLoggedIn ? (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-nobel-navy-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-nobel-navy-900 heading-serif">
                  Student Portal Login
                </h2>
                <p className="text-xs text-slate-500">
                  Enter your User ID (Ref Code) & Date of Birth
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-700 mb-1">
                    User ID (Application Ref Code / Student ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ENT-2026-000101"
                    value={refInput}
                    onChange={(e) => setRefInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-700 mb-1">
                    Date of Birth (BS) YYYY-MM-DD *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="YYYY-MM-DD (e.g. 2062-05-12)"
                    value={dobInput}
                    onChange={(e) => setDobInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-nobel-navy-900 text-white font-bold text-sm hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  Secure Sign In
                </button>
              </form>
            </div>
          ) : (
            /* 2. LOGGED IN STUDENT DASHBOARD & OFFICIAL ADMIT CARD */
            activeRecord && (
              <div className="space-y-6">
                {/* Profile Header Bar (Hidden on Print) */}
                <div className="bg-nobel-navy-950 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border border-slate-800 print:hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-500 text-nobel-navy-950 flex items-center justify-center font-black text-xl shadow shrink-0">
                      {activeRecord.photoUrl ? (
                        <img src={activeRecord.photoUrl} alt={activeRecord.name} className="w-full h-full object-cover" />
                      ) : (
                        activeRecord.name.split(' ').map((n) => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold">{activeRecord.name}</h2>
                        <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase border border-amber-500/30">
                          {activeRecord.type === 'ENTRANCE_APPLICANT' ? 'Entrance Candidate' : 'Enrolled Student'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-1">
                        {activeRecord.program} • User ID: <span className="font-mono text-amber-400 font-bold">{activeRecord.refCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {activeRecord.entranceStatus === 'VERIFIED_APPROVED' && (
                      <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => setPortalTab('ADMIT_CARD')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            portalTab === 'ADMIT_CARD' ? 'bg-amber-500 text-nobel-navy-950 shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          🎫 Admit Card
                        </button>
                        <button
                          onClick={() => setPortalTab('ENTRANCE_RESULT')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            portalTab === 'ENTRANCE_RESULT' ? 'bg-amber-500 text-nobel-navy-950 shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          📊 Entrance Score Result
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-red-600/80 text-slate-400 hover:text-white border border-slate-800 transition"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Entrance Applicant Portal View */}
                {activeRecord.type === 'ENTRANCE_APPLICANT' && (
                  <div className="space-y-6">
                    
                    {/* Status Action Banner (Hidden on Print) */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification & Application Status</span>
                        <div className="text-base sm:text-lg font-bold text-nobel-navy-900 mt-0.5 flex items-center gap-2">
                          {activeRecord.entranceStatus === 'VERIFIED_APPROVED' ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              <span className="text-emerald-700">Verified & Approved by College Admin</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                              <span className="text-amber-700">Pending Admin Verification</span>
                            </>
                          )}
                        </div>
                      </div>

                      {activeRecord.entranceStatus === 'VERIFIED_APPROVED' && portalTab === 'ADMIT_CARD' && (
                        <button
                          onClick={() => window.print()}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-nobel-navy-900 text-amber-400 font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center justify-center gap-2 shrink-0"
                        >
                          <Printer className="w-4 h-4" />
                          Download & Print Admit Card (PDF)
                        </button>
                      )}
                    </div>

                    {/* 🎫 PROFESSIONAL HIGH-STANDARD PRINTABLE ADMIT CARD */}
                    {activeRecord.entranceStatus === 'VERIFIED_APPROVED' && portalTab === 'ADMIT_CARD' && (
                      <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-2xl border-2 border-slate-300 shadow-xl space-y-6 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full font-sans">
                        
                        {/* Admit Card Header Stamp */}
                        <div className="border-b-2 border-slate-900 pb-5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-nobel-navy-900 text-amber-400 flex items-center justify-center font-black text-2xl shadow shrink-0">
                              <GraduationCap className="w-10 h-10" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif tracking-tight">
                                NOBEL MULTIPLE COLLEGE
                              </h2>
                              <p className="text-xs text-slate-700 font-bold uppercase tracking-wider">
                                Bardibas, Mahottari, Madhesh Province, Nepal
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Affiliated Higher Education Institution • Entrance Examination Desk
                              </p>
                            </div>
                          </div>

                          <div className="text-right border-l-2 border-slate-300 pl-4 shrink-0">
                            <span className="text-[10px] font-extrabold text-slate-500 uppercase block tracking-wider">Entrance Symbol No.</span>
                            <span className="font-mono font-black text-nobel-navy-900 text-xl tracking-tight">{activeRecord.symbolNumber}</span>
                            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">VERIFIED & APPROVED</span>
                          </div>
                        </div>

                        {/* Title Ribbon */}
                        <div className="bg-nobel-navy-950 text-amber-400 text-center py-2 px-4 rounded-lg font-black text-sm uppercase tracking-widest print:bg-slate-900 print:text-white">
                          ENTRANCE EXAMINATION ADMIT CARD - SESSION 2026
                        </div>

                        {/* Main Details & Photograph Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                          
                          {/* Candidate Details Table */}
                          <div className="sm:col-span-9 grid grid-cols-2 gap-4 text-xs border border-slate-200 p-5 rounded-xl bg-slate-50/50 print:bg-white print:border-slate-300">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Candidate Full Name</span>
                              <span className="font-extrabold text-slate-900 text-sm">{activeRecord.name}</span>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Application Ref / User ID</span>
                              <span className="font-mono font-extrabold text-slate-900 text-xs">{activeRecord.refCode}</span>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Father / Guardian Name</span>
                              <span className="font-semibold text-slate-800">{activeRecord.guardianName}</span>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Date of Birth (BS)</span>
                              <span className="font-mono font-semibold text-slate-800">{activeRecord.dobBS}</span>
                            </div>

                            <div className="col-span-2 border-t border-slate-200 pt-3">
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Target Applied Program</span>
                              <span className="font-extrabold text-nobel-navy-900 text-sm">{activeRecord.program}</span>
                            </div>

                            <div className="border-t border-slate-200 pt-3">
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Examination Date & Time</span>
                              <span className="font-bold text-amber-700 text-xs">{activeRecord.examDate}</span>
                            </div>

                            <div className="border-t border-slate-200 pt-3">
                              <span className="text-[10px] font-bold uppercase text-slate-500 block">Assigned Exam Hall / Venue</span>
                              <span className="font-bold text-slate-900 text-xs">{activeRecord.examHall}</span>
                            </div>
                          </div>

                          {/* Candidate Uploaded Photograph Box */}
                          <div className="sm:col-span-3 flex flex-col items-center justify-center">
                            <div className="w-32 h-36 border-2 border-slate-400 rounded-xl overflow-hidden shadow bg-slate-100 flex flex-col items-center justify-center">
                              {activeRecord.photoUrl ? (
                                <img
                                  src={activeRecord.photoUrl}
                                  alt="Candidate Passport Photo"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center p-2">
                                  <UserCheck className="w-8 h-8 text-slate-400 mx-auto" />
                                  <span className="text-[9px] font-bold text-slate-500 block">Passport Photo</span>
                                </div>
                              )}
                            </div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">Official Candidate Photo</span>
                          </div>
                        </div>

                        {/* Rules & Instructions for Candidates */}
                        <div className="border border-amber-200 bg-amber-50/60 p-4 rounded-xl text-[11px] text-slate-800 space-y-1.5 print:bg-white print:border-slate-300">
                          <span className="font-extrabold uppercase text-amber-900 block text-xs">
                            Important Candidate Instructions:
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700">
                            <li>Candidates must present this printed Admit Card along with original SEE Marksheet or Citizenship Card at the entrance gate.</li>
                            <li>Arrive at the examination hall at least 30 minutes prior to the scheduled start time.</li>
                            <li>Mobile phones, smartwatches, programmable calculators, and unauthorized materials are strictly prohibited.</li>
                          </ul>
                        </div>

                        {/* Dual Signatures Section (Candidate Signature + Campus Chief Signature Stamp) */}
                        <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-end text-xs">
                          {/* Candidate Uploaded Signature */}
                          <div className="text-center w-44 space-y-1">
                            <div className="h-12 flex items-end justify-center border-b border-slate-800 pb-1">
                              {activeRecord.candidateSignatureUrl ? (
                                <img
                                  src={activeRecord.candidateSignatureUrl}
                                  alt="Candidate Signature"
                                  className="max-h-10 object-contain"
                                />
                              ) : (
                                <span className="font-mono text-[11px] italic text-slate-400">{activeRecord.name}</span>
                              )}
                            </div>
                            <span className="font-bold text-[10px] uppercase text-slate-700 block">Candidate Signature</span>
                          </div>

                          {/* Global Campus Chief Official Signature Stamp */}
                          <div className="text-center w-52 space-y-1">
                            <div className="h-12 flex items-end justify-center border-b border-slate-800 pb-1">
                              {activeRecord.principalSignatureUrl ? (
                                <img
                                  src={activeRecord.principalSignatureUrl}
                                  alt="Campus Chief Official Signature Stamp"
                                  className="max-h-10 object-contain"
                                />
                              ) : (
                                <span className="font-bold text-nobel-navy-900 text-xs">Prof. Dr. Ram Shrestha</span>
                              )}
                            </div>
                            <span className="font-bold text-[10px] uppercase text-slate-700 block">Campus Chief / Controller of Exams</span>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Tab 2: Entrance Examination Score & Rank Results */}
                    {activeRecord.entranceStatus === 'VERIFIED_APPROVED' && portalTab === 'ENTRANCE_RESULT' && (
                      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow border border-amber-200">
                          <Trophy className="w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest block">
                            Official Published Entrance Result 2026
                          </span>
                          <h3 className="text-3xl font-black text-nobel-navy-900 heading-serif">
                            Entrance Score: {activeRecord.entranceScore} / 100
                          </h3>
                          <div className="inline-block px-3 py-1 rounded-full bg-nobel-navy-950 text-amber-400 text-xs font-extrabold">
                            {activeRecord.entranceRank}
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 max-w-lg mx-auto text-left space-y-2 text-xs">
                          <div className="font-bold flex items-center gap-2 text-amber-900 text-sm">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            Merit Scholarship Award Certificate
                          </div>
                          <p className="text-amber-800 leading-relaxed font-semibold">
                            {activeRecord.scholarshipOffer}
                          </p>
                          <p className="text-slate-600 pt-1">
                            Candidate is requested to report to the Nobel Multiple College Bardibas campus with original SEE marksheets for formal seat reservation.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Pending Verification Card */}
                    {activeRecord.entranceStatus === 'SUBMITTED' && (
                      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4 max-w-lg mx-auto">
                        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                          <Clock className="w-7 h-7 animate-spin" />
                        </div>
                        <h3 className="text-lg font-bold text-nobel-navy-900">
                          Application Under Admin Verification
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Your entrance application (<strong className="font-mono">{activeRecord.refCode}</strong>) has been logged. The Nobel Multiple College verification committee is currently checking your SEE marksheets.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

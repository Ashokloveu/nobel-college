'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { addItem } from '@/lib/storage';
import {
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  User,
  MapPin,
  GraduationCap,
  LogIn,
  Upload,
  Image as ImageIcon,
  PenTool,
  AlertCircle,
} from 'lucide-react';

interface EntranceApplication {
  regNumber: string;
  fullName: string;
  guardianName: string;
  guardianPhone: string;
  dobBS: string;
  province: string;
  district: string;
  localAddress: string;
  seeSchool: string;
  seeGPA: string;
  program: string;
  photoUrl?: string;
  signatureUrl?: string;
  submittedAt: string;
}

export default function EntranceRegistrationPage() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [dobBS, setDobBS] = useState('2062-04-15');
  const [province, setProvince] = useState('Madhesh Province');
  const [district, setDistrict] = useState('Mahottari');
  const [localAddress, setLocalAddress] = useState('Bardibas-3');
  const [seeSchool, setSeeSchool] = useState('');
  const [seeGPA, setSeeGPA] = useState('3.60');
  const [program, setProgram] = useState('Bachelor in Computer Application (BCA)');
  
  // Photo & Signature Upload State (Max 200KB)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [signatureError, setSignatureError] = useState<string | null>(null);

  const [submittedReg, setSubmittedReg] = useState<EntranceApplication | null>(null);

  // File Upload Handlers with 200KB Validation
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024) {
        setPhotoError('Image size exceeds 200KB limit! Please upload a passport photo smaller than 200KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024) {
        setSignatureError('File size exceeds 200KB limit! Please upload a signature image smaller than 200KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignatureUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const newRegNum = `ENT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApp: EntranceApplication = {
      regNumber: newRegNum,
      fullName,
      guardianName,
      guardianPhone,
      dobBS,
      province,
      district,
      localAddress,
      seeSchool,
      seeGPA,
      program,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      signatureUrl: signatureUrl || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
      submittedAt: new Date().toLocaleString(),
    };

    // Save persistently to storage
    addItem('nobel_cms_entrance_apps', {
      ...newApp,
      id: newRegNum,
      applicantName: fullName,
      status: 'SUBMITTED',
      admitCardGenerated: true,
      symbolNo: `SYM-${newRegNum.slice(-6)}`,
    });

    setSubmittedReg(newApp);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Nepalese Academic Entrance Portal 2026
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-nobel-navy-900 heading-serif">
              Online Entrance Exam Registration
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Official entrance application form for +2 Science, +2 Management, BCA, and BBS at Nobel Multiple College, Bardibas. Approved directly by College Admin.
            </p>
          </div>

          {!submittedReg ? (
            /* Registration Form */
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-nobel-navy-900 heading-serif flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-nobel-crimson" />
                  Applicant Personal, Academic & Document Upload Details
                </h2>
                <p className="text-xs text-slate-500">
                  Fill out all required details accurately as per your SEE / SLC Marksheet.
                </p>
              </div>

              <form onSubmit={handleSubmitRegistration} className="space-y-6 text-xs">
                {/* Section 1: Basic Profile */}
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-wider block">
                    Section 1: Applicant Profile
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        Full Name (English) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sujan Mahato"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        Date of Birth (BS) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="YYYY-MM-DD (e.g. 2062-04-15)"
                        value={dobBS}
                        onChange={(e) => setDobBS(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        Father's / Guardian's Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ram Kumar Mahato"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        Guardian Mobile Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+977-98XXXXXXXX"
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Permanent Address in Nepal */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-wider block">
                    Section 2: Permanent Address (Nepal)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">Province</label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-xs"
                      >
                        <option value="Madhesh Province">Madhesh Province</option>
                        <option value="Bagmati Province">Bagmati Province</option>
                        <option value="Koshi Province">Koshi Province</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">District</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-xs"
                      >
                        <option value="Mahottari">Mahottari</option>
                        <option value="Dhanusha">Dhanusha</option>
                        <option value="Sarlahi">Sarlahi</option>
                        <option value="Rautahat">Rautahat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">Local Level & Ward</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bardibas-3"
                        value={localAddress}
                        onChange={(e) => setLocalAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Academic Background & Program */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-wider block">
                    Section 3: Previous Academic Record & Program Selection
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        SEE / SLC School Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Janata Secondary School"
                        value={seeSchool}
                        onChange={(e) => setSeeSchool(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-700 mb-1">
                        SEE Overall GPA / Grade *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3.60"
                        value={seeGPA}
                        onChange={(e) => setSeeGPA(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      Apply For Target Degree Program *
                    </label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-nobel-navy-900 text-slate-900 text-sm font-bold"
                    >
                      <option value="Bachelor in Computer Application (BCA)">Bachelor in Computer Application (BCA)</option>
                      <option value="Bachelor of Business Studies (BBS)">Bachelor of Business Studies (BBS)</option>
                      <option value="+2 Science Stream">+2 Science Stream</option>
                      <option value="+2 Management Stream">+2 Management Stream</option>
                    </select>
                  </div>
                </div>

                {/* Section 4: Passport Photo (Max 200KB) & Signature Upload */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-nobel-crimson uppercase tracking-wider block">
                    Section 4: Photo & Candidate Signature Upload (Max 200KB Each)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Passport Photo Upload */}
                    <div className="space-y-2">
                      <label className="block font-bold uppercase text-slate-700">
                        Passport Size Photograph (Max 200KB) *
                      </label>
                      <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-3 bg-slate-50">
                        {photoUrl ? (
                          <div className="space-y-2">
                            <img
                              src={photoUrl}
                              alt="Uploaded Passport Photo"
                              className="w-24 h-28 object-cover rounded-lg border-2 border-nobel-navy-900 mx-auto shadow"
                            />
                            <span className="text-[11px] text-emerald-600 font-bold block">✓ Photo Attached</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                            <div className="text-xs font-bold text-slate-700">Upload Candidate Photo</div>
                            <div className="text-[10px] text-slate-400">PNG, JPG or JPEG (Max 200KB)</div>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-nobel-navy-900 file:text-white hover:file:bg-nobel-navy-800 cursor-pointer"
                        />
                      </div>
                      {photoError && (
                        <div className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{photoError}</span>
                        </div>
                      )}
                    </div>

                    {/* Candidate Signature Upload */}
                    <div className="space-y-2">
                      <label className="block font-bold uppercase text-slate-700">
                        Candidate Digital Signature (Max 200KB) *
                      </label>
                      <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl text-center space-y-3 bg-slate-50">
                        {signatureUrl ? (
                          <div className="space-y-2">
                            <img
                              src={signatureUrl}
                              alt="Uploaded Candidate Signature"
                              className="h-16 object-contain rounded border border-slate-300 mx-auto bg-white p-1"
                            />
                            <span className="text-[11px] text-emerald-600 font-bold block">✓ Signature Attached</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <PenTool className="w-8 h-8 text-slate-400 mx-auto" />
                            <div className="text-xs font-bold text-slate-700">Upload Digital Signature</div>
                            <div className="text-[10px] text-slate-400">Clear sign image (Max 200KB)</div>
                          </div>
                        )}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-nobel-navy-900 file:text-white hover:file:bg-nobel-navy-800 cursor-pointer"
                        />
                      </div>
                      {signatureError && (
                        <div className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{signatureError}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-sm hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
                  >
                    Submit Entrance Registration Form <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Application Confirmation Receipt */
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block">
                  Registration & Document Upload Complete
                </span>
                <h2 className="text-2xl font-black text-nobel-navy-900 heading-serif">
                  Application Ref: {submittedReg.regNumber}
                </h2>
                <p className="text-xs text-slate-600">
                  Thank you <strong className="text-slate-900">{submittedReg.fullName}</strong>. Your entrance registration, photo, and signature have been logged for College Admin verification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left max-w-lg mx-auto text-xs space-y-2 text-amber-900">
                <div className="font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  What to do next:
                </div>
                <div>1. Log in to the <strong>Student Portal</strong> using your Reference Code <strong>{submittedReg.regNumber}</strong> and DOB <strong>{submittedReg.dobBS}</strong>.</div>
                <div>2. Track verification status and download your official <strong>Entrance Admit Card</strong> complete with your photo & signatures.</div>
                <div>3. After the examination, view your <strong>Entrance Score & Merit Rank Result</strong> inside the portal!</div>
              </div>

              <div className="pt-4 flex justify-center">
                <Link
                  href="/student-portal"
                  className="px-8 py-3.5 rounded-xl bg-nobel-navy-900 text-white font-bold text-xs hover:bg-nobel-navy-800 transition shadow flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  Go to Student Portal to Check Status & Admit Card →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

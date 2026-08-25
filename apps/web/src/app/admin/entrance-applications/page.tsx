'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Search,
  Award,
  Calendar,
  MapPin,
  FileText,
  Save,
  ShieldCheck,
} from 'lucide-react';

interface EntranceAppRecord {
  id: string;
  regNumber: string;
  symbolNumber?: string;
  fullName: string;
  guardianName: string;
  phone: string;
  district: string;
  seeSchool: string;
  seeGPA: string;
  program: string;
  status: 'SUBMITTED' | 'VERIFIED_APPROVED' | 'REJECTED';
  examDate?: string;
  examHall?: string;
  submittedAt: string;
}

import { getStoredItems, saveStoredItems } from '@/lib/storage';

const DEFAULT_ENTRANCE_APPS: EntranceAppRecord[] = [
  {
    id: '1',
    regNumber: 'ENT-2026-000101',
    symbolNumber: 'NMC-SYM-2026-042',
    fullName: 'Sujan Mahato',
    guardianName: 'Ram Kumar Mahato',
    phone: '+977-9851234567',
    district: 'Mahottari',
    seeSchool: 'Janata Secondary School, Bardibas',
    seeGPA: '3.75',
    program: 'Bachelor in Computer Application (BCA)',
    status: 'VERIFIED_APPROVED',
    examDate: 'September 10, 2026 (11:00 AM)',
    examHall: 'Main Academic Hall - Room 102',
    submittedAt: '2026-08-24 09:30 AM',
  },
  {
    id: '2',
    regNumber: 'ENT-2026-000102',
    fullName: 'Pooja Raut',
    guardianName: 'Shyam Raut',
    phone: '+977-9844112233',
    district: 'Dhanusha',
    seeSchool: 'Shree Krishna H.S. School, Janakpur',
    seeGPA: '3.85',
    program: '+2 Science Stream',
    status: 'SUBMITTED',
    submittedAt: '2026-08-24 10:45 AM',
  },
];

export default function AdminEntranceApplicationsPage() {
  const [applications, setApplications] = useState<EntranceAppRecord[]>([]);

  React.useEffect(() => {
    const loadApps = () => {
      setApplications(getStoredItems<EntranceAppRecord>('nobel_cms_entrance_apps', DEFAULT_ENTRANCE_APPS));
    };
    loadApps();
    window.addEventListener('storage', loadApps);
    return () => window.removeEventListener('storage', loadApps);
  }, []);

  const saveApps = (updated: EntranceAppRecord[]) => {
    setApplications(updated);
    saveStoredItems('nobel_cms_entrance_apps', updated);
  };

  const [selectedApp, setSelectedApp] = useState<EntranceAppRecord | null>(null);
  const [symbolNo, setSymbolNo] = useState('');
  const [examDate, setExamDate] = useState('September 10, 2026 (11:00 AM)');
  const [examHall, setExamHall] = useState('Main Academic Hall - Room 102');

  const openApproveModal = (app: EntranceAppRecord) => {
    setSelectedApp(app);
    setSymbolNo(app.symbolNumber || `NMC-SYM-2026-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleApproveAndIssueAdmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const updated = applications.map((a) =>
      a.id === selectedApp.id
        ? {
            ...a,
            status: 'VERIFIED_APPROVED' as const,
            symbolNumber: symbolNo,
            examDate,
            examHall,
          }
        : a
    );

    saveApps(updated);
    setSelectedApp(null);
  };

  return (
    <AdminLayout
      title="Entrance Exam Applications & Admit Card Approval"
      subtitle="Verify Nepalese SEE documents, issue entrance symbol numbers, and release admit cards"
    >
      <div className="space-y-6">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Reg Code</th>
                <th className="py-4 px-4">Applicant Profile</th>
                <th className="py-4 px-4">SEE School & GPA</th>
                <th className="py-4 px-4">Program Selection</th>
                <th className="py-4 px-4">Verification Status</th>
                <th className="py-4 px-4">Symbol No.</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">{app.regNumber}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{app.fullName}</div>
                    <div className="text-slate-400 text-[11px]">{app.guardianName} • {app.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-300 font-medium">{app.seeSchool}</div>
                    <div className="text-amber-400 font-bold text-[11px]">GPA: {app.seeGPA}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-semibold">{app.program}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase border ${
                        app.status === 'VERIFIED_APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {app.status === 'VERIFIED_APPROVED' ? 'Approved & Issued' : 'Pending Verification'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">
                    {app.symbolNumber || '—'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => openApproveModal(app)}
                      className="px-3 py-1.5 rounded-lg bg-nobel-navy-800 text-amber-400 font-bold hover:bg-nobel-navy-700 transition border border-amber-500/30"
                    >
                      {app.status === 'VERIFIED_APPROVED' ? 'Edit Details' : 'Verify & Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Approval & Admit Card Generation Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Approve Entrance & Issue Admit Card
                  </h3>
                  <span className="text-xs text-slate-400">{selectedApp.fullName} ({selectedApp.regNumber})</span>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-white font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleApproveAndIssueAdmitCard} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Assigned Symbol Number *</label>
                  <input
                    type="text"
                    required
                    value={symbolNo}
                    onChange={(e) => setSymbolNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Entrance Examination Date & Time</label>
                  <input
                    type="text"
                    required
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Exam Venue / Hall Room</label>
                  <input
                    type="text"
                    required
                    value={examHall}
                    onChange={(e) => setExamHall(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 text-nobel-navy-950 font-bold text-xs hover:bg-amber-400 shadow flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Approve & Issue Admit Card Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

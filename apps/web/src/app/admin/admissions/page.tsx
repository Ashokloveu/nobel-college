'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  FileText,
  Tag,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  Download,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';

interface Inquiry {
  id: string;
  inquiryNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  program: string;
  qualification: string;
  status: 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'CONVERTED' | 'LOST';
  isPossibleDuplicate: boolean;
  assignedTo: string;
  followUpAt?: string;
  notes: { note: string; addedBy: string; date: string }[];
  createdAt: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    inquiryNumber: 'NMC-2026-000101',
    applicantName: 'Sujan Shrestha',
    email: 'sujan.shrestha@example.com',
    phone: '+977-9851234567',
    address: 'Bardibas-3, Mahottari',
    program: 'Bachelor in Computer Application (BCA)',
    qualification: 'SEE Passed / Class 12 Completed',
    status: 'NEW',
    isPossibleDuplicate: false,
    assignedTo: 'Unassigned',
    notes: [{ note: 'Form submitted via online portal', addedBy: 'System', date: '2026-08-24 10:15 AM' }],
    createdAt: '2026-08-24 10:15 AM',
  },
  {
    id: '2',
    inquiryNumber: 'NMC-2026-000102',
    applicantName: 'Anjali Sharma',
    email: 'anjali.sharma@example.com',
    phone: '+977-9841987654',
    address: 'Jaleshwar-5, Mahottari',
    program: '+2 Science Stream',
    qualification: 'SEE Passed (GPA 3.80)',
    status: 'CONTACTED',
    isPossibleDuplicate: false,
    assignedTo: 'Counselor Hari',
    notes: [{ note: 'Called candidate. Interested in Science Lab orientation.', addedBy: 'Hari', date: '2026-08-24 11:30 AM' }],
    createdAt: '2026-08-24 11:00 AM',
  },
  {
    id: '3',
    inquiryNumber: 'NMC-2026-000103',
    applicantName: 'Ramesh Chaudhary',
    email: 'ramesh.c@example.com',
    phone: '+977-9801234567',
    address: 'Lalgadh, Mahottari',
    program: 'Bachelor of Business Studies (BBS)',
    qualification: 'Class 12 Management',
    status: 'FOLLOW_UP',
    isPossibleDuplicate: true,
    assignedTo: 'Officer Sita',
    followUpAt: '2026-08-26',
    notes: [{ note: 'Follow up requested on scholarship eligibility.', addedBy: 'Sita', date: '2026-08-24 02:00 PM' }],
    createdAt: '2026-08-24 01:45 PM',
  },
];

import { getStoredItems, saveStoredItems } from '@/lib/storage';

export default function AdminAdmissionsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  React.useEffect(() => {
    const loadInquiries = () => {
      setInquiries(getStoredItems<Inquiry>('nobel_cms_admissions', INITIAL_INQUIRIES));
    };
    loadInquiries();
    window.addEventListener('storage', loadInquiries);
    return () => window.removeEventListener('storage', loadInquiries);
  }, []);

  const saveInquiries = (updated: Inquiry[]) => {
    setInquiries(updated);
    saveStoredItems('nobel_cms_admissions', updated);
  };
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Filter Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'DUPLICATES' ? inq.isPossibleDuplicate : inq.status === activeTab);
    const matchesSearch =
      inq.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.inquiryNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Inquiry ID,Applicant Name,Email,Phone,Program,Status,Date\n'];
    const rows = filteredInquiries.map(
      (inq) => `"${inq.inquiryNumber}","${inq.applicantName}","${inq.email}","${inq.phone}","${inq.program}","${inq.status}","${inq.createdAt}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `nobel_admissions_registry_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <AdminLayout
      title="Admission Inquiries CRM & Pipeline"
      subtitle="Track online applications, assign admission officers, flag duplicates, and export registries"
    >
      <div className="space-y-6">
        {/* Top Filter Tabs & Action Bar */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {['ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'DUPLICATES'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                  activeTab === tab
                    ? 'bg-amber-500 text-nobel-navy-950 shadow'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow flex items-center gap-1.5 shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              Export Excel (.csv)
            </button>
          </div>
        </div>

        {/* Admissions Data Table */}
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 shadow-lg overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Program</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-700/40 transition">
                  <td className="p-4 font-mono font-bold text-amber-400">{inq.inquiryNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{inq.applicantName}</div>
                    <div className="text-[11px] text-slate-400">{inq.address}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-200">{inq.program}</td>
                  <td className="p-4">
                    <div>{inq.phone}</div>
                    <div className="text-[11px] text-slate-400">{inq.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase border border-blue-500/30">
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-nobel-navy-950 font-bold text-xs hover:bg-amber-400 transition"
                    >
                      Manage Candidate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

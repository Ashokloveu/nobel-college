'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import {
  Users,
  Inbox,
  FileText,
  Bell,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [quickNoticeModal, setQuickNoticeModal] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (noticeTitle.trim()) {
      try {
        const saved = localStorage.getItem('nobel_cms_notices');
        const existing = saved
          ? JSON.parse(saved)
          : [
              { id: '1', title: 'Admissions Open for Session 2026', category: 'Admission', status: 'PUBLISHED', isImportant: true, date: '2026-08-24' },
              { id: '2', title: 'First Semester Internal Examination Routine Notice', category: 'Examination', status: 'PUBLISHED', isImportant: false, date: '2026-08-18' },
            ];
        const newItem = {
          id: Date.now().toString(),
          title: noticeTitle.trim(),
          category: 'Admission',
          isImportant: true,
          status: 'PUBLISHED',
          date: new Date().toISOString().split('T')[0],
        };
        localStorage.setItem('nobel_cms_notices', JSON.stringify([newItem, ...existing]));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.error('Failed to save quick notice:', err);
      }
    }
    setNoticeSuccess(true);
    setTimeout(() => {
      setNoticeSuccess(false);
      setQuickNoticeModal(false);
      setNoticeTitle('');
    }, 1500);
  };

  return (
    <AdminLayout
      title="Institutional Dashboard & Analytics"
      subtitle="Nobel Multiple College • Bardibas, Mahottari, Madhesh Province, Nepal"
    >
      <div className="space-y-8">
        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Admissions */}
          <Link
            href="/admin/admissions"
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-6 rounded-2xl transition group relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Admission CRM</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-black text-white">42</div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <TrendingUp className="w-3 h-3" />
                +28%
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-700/60 pt-3">
              <span>12 New Today</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: Contact Messages */}
          <Link
            href="/admin/contacts"
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-6 rounded-2xl transition group relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Contact Inbox</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Inbox className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-black text-white">18</div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                5 Unread
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-700/60 pt-3">
              <span>Pending Action</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: News & CMS */}
          <Link
            href="/admin/news"
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-6 rounded-2xl transition group relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Published News</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-black text-white">24</div>
              <span className="text-xs text-slate-400 font-medium">4 Categories</span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-700/60 pt-3">
              <span>Latest: Exhibition 2026</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Notices */}
          <Link
            href="/admin/notices"
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-6 rounded-2xl transition group relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Active Notices</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-black text-white">8</div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                2 Important
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between border-t border-slate-700/60 pt-3">
              <span>Session 2026 Admission Notice</span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>

        {/* Action Shortcuts & Recent Inquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Admission Stream */}
          <div className="lg:col-span-8 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white heading-serif">Recent Admission Inquiries Stream</h2>
                <p className="text-xs text-slate-400">Live feed of public online applications</p>
              </div>
              <Link
                href="/admin/admissions"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline"
              >
                Open CRM Table <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">NMC-2026-000101</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
                      NEW
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">Sujan Shrestha</div>
                  <div className="text-xs text-slate-400">Bachelor in Computer Application (BCA) • sujan@example.com</div>
                </div>
                <Link
                  href="/admin/admissions"
                  className="px-3 py-1.5 rounded-lg bg-nobel-navy-800 text-amber-400 font-bold text-xs hover:bg-nobel-navy-700 transition shrink-0"
                >
                  Manage
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">NMC-2026-000102</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px] uppercase">
                      CONTACTED
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">Anjali Sharma</div>
                  <div className="text-xs text-slate-400">+2 Science Stream • anjali@example.com</div>
                </div>
                <Link
                  href="/admin/admissions"
                  className="px-3 py-1.5 rounded-lg bg-nobel-navy-800 text-amber-400 font-bold text-xs hover:bg-nobel-navy-700 transition shrink-0"
                >
                  Manage
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs">NMC-2026-000103</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase">
                      FOLLOW UP
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px] uppercase flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Duplicate Flag
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">Ramesh Chaudhary</div>
                  <div className="text-xs text-slate-400">Bachelor of Business Studies (BBS) • ramesh@example.com</div>
                </div>
                <Link
                  href="/admin/admissions"
                  className="px-3 py-1.5 rounded-lg bg-nobel-navy-800 text-amber-400 font-bold text-xs hover:bg-nobel-navy-700 transition shrink-0"
                >
                  Manage
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions & Security Status Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-lg">
              <h3 className="text-base font-bold text-white heading-serif flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Quick Actions
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => setQuickNoticeModal(true)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition border border-slate-700/60"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    Publish Quick Notice
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>

                <Link
                  href="/admin/news"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition border border-slate-700/60"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Create News Article
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>

                <Link
                  href="/admin/settings"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition border border-slate-700/60"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    System Site Settings
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              </div>
            </div>

            {/* Audit Log Stream Box */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white heading-serif">System Audit Trail</h3>
                <Link href="/admin/audit-logs" className="text-xs text-amber-400 font-bold hover:underline">
                  View Logs
                </Link>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/90 text-slate-300">
                  <div className="text-amber-400 font-bold">UPDATE_ADMISSION_STATUS</div>
                  <div className="text-[11px] text-slate-400">admin@nobelcollege.edu.np • 127.0.0.1</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 text-slate-300">
                  <div className="text-emerald-400 font-bold">CREATE_NEWS_ARTICLE</div>
                  <div className="text-[11px] text-slate-400">content@nobelcollege.edu.np • 127.0.0.1</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Notice Publishing Modal */}
        {quickNoticeModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">Publish Quick Notice</h3>
                <button onClick={() => setQuickNoticeModal(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              {noticeSuccess && (
                <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Notice published successfully!</span>
                </div>
              )}

              <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Campus Holiday Announcement"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuickNoticeModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 text-nobel-navy-950 font-bold text-xs hover:bg-amber-400 shadow"
                  >
                    Publish Notice Now
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

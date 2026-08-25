'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Inbox, Mail, CheckCircle2, Search } from 'lucide-react';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      ref: 'MSG-2026-000101',
      name: 'Rohan Shrestha',
      email: 'rohan@example.com',
      subject: 'Inquiry regarding BCA Fee Structure & Hostel Facilities',
      message: 'Hello, I would like to inquire about the total fee for BCA 4-year degree and whether hostel facilities are available on campus.',
      status: 'UNREAD',
      createdAt: '2026-08-24 11:20 AM',
    },
    {
      id: '2',
      ref: 'MSG-2026-000102',
      name: 'Priya Mahato',
      email: 'priya@example.com',
      subject: '+2 Science Admission Eligibility',
      message: 'Respected Campus Chief, I scored GPA 3.6 in SEE. Am I eligible for full merit scholarship in +2 Science?',
      status: 'READ',
      createdAt: '2026-08-23 03:10 PM',
    },
  ]);

  const toggleStatus = (id: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'UNREAD' ? 'READ' : 'UNREAD' } : m
      )
    );
  };

  return (
    <AdminLayout
      title="Contact Inbox Management"
      subtitle="Public inquiry messages, suggestions, and official communication"
    >
      <div className="space-y-6">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <div className="divide-y divide-slate-700/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-6 transition ${
                  m.status === 'UNREAD' ? 'bg-slate-800/90 font-semibold border-l-4 border-l-amber-500' : 'hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{m.ref}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        m.status === 'UNREAD' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <span className="text-slate-400">{m.createdAt}</span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{m.subject}</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">{m.message}</p>

                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-700/60 text-xs text-slate-400 gap-4">
                  <span>From: <strong className="text-white">{m.name}</strong> ({m.email})</span>
                  <button
                    onClick={() => toggleStatus(m.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-nobel-navy-800 text-amber-400 font-bold hover:bg-nobel-navy-700 transition border border-amber-500/30"
                  >
                    Mark as {m.status === 'UNREAD' ? 'Read' : 'Unread'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

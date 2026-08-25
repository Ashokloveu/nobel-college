'use client';

import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ShieldCheck, Lock } from 'lucide-react';

export default function AdminRolesPage() {
  const roles = [
    { name: 'SUPER_ADMIN', desc: 'Complete institutional authority across system settings, staff management, and security audit logs.' },
    { name: 'ADMINISTRATOR', desc: 'Managing staff, reviewing audit logs, and overseeing academic and CMS modules.' },
    { name: 'ADMISSION_OFFICER', desc: 'Accessing Admission Inquiry CRM, contacting applicants, updating status, and adding internal notes.' },
    { name: 'CONTENT_MANAGER', desc: 'Creating, editing, and publishing news, notices, events, programs, departments, and media items.' },
    { name: 'EDITOR', desc: 'Drafting news articles, notices, and events pending approval.' },
  ];

  return (
    <AdminLayout
      title="Role-Based Access Control (RBAC) Permission Matrix"
      subtitle="Institutional role definitions, granular resource permissions, and boundary controls"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r, idx) => (
            <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-amber-400 text-sm">{r.name}</span>
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px] border border-purple-500/30">
                  SYSTEM ROLE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

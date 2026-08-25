'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ShieldCheck, Clock, User, Filter } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs] = useState([
    { id: '1', actor: 'admin@nobelcollege.edu.np', action: 'UPDATE_ADMISSION_STATUS', module: 'ADMISSION_CRM', ip: '127.0.0.1', timestamp: '2026-08-24 11:30:15 AM' },
    { id: '2', actor: 'admin@nobelcollege.edu.np', action: 'CREATE_NEWS', module: 'CMS', ip: '127.0.0.1', timestamp: '2026-08-24 10:14:02 AM' },
    { id: '3', actor: 'admin@nobelcollege.edu.np', action: 'ENABLE_2FA', module: 'AUTH', ip: '127.0.0.1', timestamp: '2026-08-23 04:22:50 PM' },
  ]);

  return (
    <AdminLayout
      title="System Security Audit Trail Logs"
      subtitle="Immutable record of administrative actions, staff logins, and database mutations"
    >
      <div className="space-y-6">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Actor Email</th>
                <th className="py-4 px-4">Action</th>
                <th className="py-4 px-4">Module</th>
                <th className="py-4 px-4">IP Address</th>
                <th className="py-4 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs font-mono">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white font-sans">{l.actor}</td>
                  <td className="py-4 px-4 font-bold text-amber-400">{l.action}</td>
                  <td className="py-4 px-4 font-sans">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 font-bold text-[10px] border border-slate-700">
                      {l.module}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{l.ip}</td>
                  <td className="py-4 px-4 text-slate-400 font-sans">{l.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ShieldCheck, Plus, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  const [users] = useState([
    { id: '1', name: 'College Administrator', email: 'admin@nobelcollege.edu.np', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { id: '2', name: 'Admission Officer', email: 'admission@nobelcollege.edu.np', role: 'ADMISSION_OFFICER', status: 'ACTIVE' },
    { id: '3', name: 'Content Manager', email: 'content@nobelcollege.edu.np', role: 'CONTENT_MANAGER', status: 'ACTIVE' },
  ]);

  return (
    <AdminLayout
      title="Staff User Accounts & Permission Governance"
      subtitle="Create, manage, and assign institutional staff credentials and RBAC roles"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Staff Accounts</h2>
          <button className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition">
            <Plus className="w-4 h-4" />
            Create User Account
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Staff Member</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">RBAC Role</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-4 px-4 text-slate-300">{u.email}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px] border border-purple-500/30">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                      {u.status}
                    </span>
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

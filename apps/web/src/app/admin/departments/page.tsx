'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDepartmentsPage() {
  const [departments] = useState([
    { id: '1', name: 'Department of Science & Technology', code: 'DST', head: 'Prof. Dr. Ram Shrestha', status: 'ACTIVE' },
    { id: '2', name: 'Department of Management Studies', code: 'DMS', head: 'Dr. Anita Sharma', status: 'ACTIVE' },
  ]);

  return (
    <AdminLayout
      title="Academic Departments Management"
      subtitle="Organize institutional faculties, department heads, and lab resources"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">College Departments</h2>
          <button className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition">
            <Plus className="w-4 h-4" />
            Add Department
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Department Name</th>
                <th className="py-4 px-4">Code</th>
                <th className="py-4 px-4">Head of Department</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white">{d.name}</td>
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">{d.code}</td>
                  <td className="py-4 px-4 text-slate-300">{d.head}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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

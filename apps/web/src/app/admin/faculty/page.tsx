'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminFacultyPage() {
  const [faculty] = useState([
    { id: '1', name: 'Prof. Dr. Ram Shrestha', designation: 'Principal / Campus Chief', qualification: 'Ph.D. in Computer Science', status: 'ACTIVE' },
    { id: '2', name: 'Dr. Anita Sharma', designation: 'HOD, Management Studies', qualification: 'Ph.D. in Financial Management', status: 'ACTIVE' },
  ]);

  return (
    <AdminLayout
      title="Faculty Directory Management"
      subtitle="Manage teaching staff profiles, academic designations, and qualifications"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Faculty Members</h2>
          <button className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition">
            <Plus className="w-4 h-4" />
            Add Faculty Member
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Faculty Name</th>
                <th className="py-4 px-4">Designation</th>
                <th className="py-4 px-4">Qualification</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {faculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white">{f.name}</td>
                  <td className="py-4 px-4 text-amber-400 font-semibold">{f.designation}</td>
                  <td className="py-4 px-4 text-slate-300">{f.qualification}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                      {f.status}
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

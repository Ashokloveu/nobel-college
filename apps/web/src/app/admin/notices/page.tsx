'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Bell, Plus, Edit, Trash2, Save } from 'lucide-react';

interface NoticeItem {
  id: string;
  title: string;
  category: string;
  status: 'PUBLISHED' | 'DRAFT';
  isImportant: boolean;
  date: string;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([
    { id: '1', title: 'Admissions Open for Session 2026', category: 'Admission', status: 'PUBLISHED', isImportant: true, date: '2026-08-24' },
    { id: '2', title: 'First Semester Internal Examination Routine Notice', category: 'Examination', status: 'PUBLISHED', isImportant: false, date: '2026-08-18' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Admission');
  const [isImportant, setIsImportant] = useState(false);
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Admission');
    setIsImportant(false);
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (item: NoticeItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setIsImportant(item.isImportant);
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setNotices((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, title, category, isImportant, status } : item
        )
      );
    } else {
      const newItem: NoticeItem = {
        id: Date.now().toString(),
        title,
        category,
        isImportant,
        status,
        date: new Date().toISOString().split('T')[0],
      };
      setNotices((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <AdminLayout
      title="CMS Official Notices & Bulletins"
      subtitle="Manage urgent institutional announcements and attachments"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Active Notices</h2>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" />
            Publish Notice
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Title</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Important</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white max-w-xs truncate">{n.title}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 font-bold text-[10px] border border-slate-700">
                      {n.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {n.isImportant ? (
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] border border-amber-500/30">
                        URGENT
                      </span>
                    ) : (
                      'Standard'
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                      {n.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{n.date}</td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button onClick={() => openEditModal(n)} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(n.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {editingItem ? 'Edit Notice' : 'Publish New Notice'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Admission">Admission</option>
                      <option value="Examination">Examination</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="imp"
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="imp" className="text-slate-300 font-bold">Mark as Urgent / Important Notice</label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 text-nobel-navy-950 font-bold text-xs hover:bg-amber-400 shadow flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Save Notice
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

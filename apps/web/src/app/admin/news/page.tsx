'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { FileText, Plus, Edit, Trash2, Save, CheckCircle2 } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string;
}

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'Nobel Multiple College Hosts Annual IT & Science Exhibition 2026',
      category: 'Campus Life',
      summary: 'Students showcased innovative software applications, robotics, and hardware projects in Bardibas.',
      status: 'PUBLISHED',
      publishedAt: '2026-08-20',
    },
    {
      id: '2',
      title: 'Oriented Workshop on Career Guidance & Higher Education Opportunities',
      category: 'Academic',
      summary: 'Distinguished industry experts delivered sessions on BCA, BBS, and postgraduate career paths.',
      status: 'PUBLISHED',
      publishedAt: '2026-08-14',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsArticle | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus Life');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('PUBLISHED');

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Campus Life');
    setSummary('');
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (item: NewsArticle) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setSummary(item.summary);
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      setNewsList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setNewsList((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, title, category, summary, status }
            : item
        )
      );
    } else {
      const newItem: NewsArticle = {
        id: Date.now().toString(),
        title,
        category,
        summary,
        status,
        publishedAt: new Date().toISOString().split('T')[0],
      };
      setNewsList((prev) => [newItem, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <AdminLayout
      title="CMS News Articles Management"
      subtitle="Publish, edit, and categorize campus news stories"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Articles & Press Releases</h2>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" />
            Publish New Article
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Title</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {newsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white max-w-xs truncate">{item.title}</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-300 font-bold text-[10px] border border-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded font-bold text-[10px] border ${
                        item.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{item.publishedAt}</td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
                  {editingItem ? 'Edit News Article' : 'Publish New News Article'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Article Title *</label>
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
                      <option value="Campus Life">Campus Life</option>
                      <option value="Academic">Academic</option>
                      <option value="Exhibition">Exhibition</option>
                      <option value="Placement">Placement</option>
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

                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Summary / Excerpt</label>
                  <textarea
                    rows={3}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                  />
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
                    Save Article
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

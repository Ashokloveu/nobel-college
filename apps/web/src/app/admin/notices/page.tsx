'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Bell, Plus, Edit, Trash2, Save, RefreshCw } from 'lucide-react';
import { getApiUrl, getStoredItems, saveStoredItems } from '@/lib/storage';

interface NoticeItem {
  id: string;
  _id?: string;
  title: string;
  category: string;
  status: 'PUBLISHED' | 'DRAFT';
  isImportant: boolean;
  date: string;
  content?: string;
  slug?: string;
}

const DEFAULT_NOTICES: NoticeItem[] = [
  { id: '1', title: 'Admissions Open for Session 2026', category: 'Admission', status: 'PUBLISHED', isImportant: true, date: '2026-08-24' },
  { id: '2', title: 'First Semester Internal Examination Routine Notice', category: 'Examination', status: 'PUBLISHED', isImportant: false, date: '2026-08-18' },
];

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notices from API (MongoDB Atlas) & fallback to persistent storage
  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/v1/cms/notices'));
      const json = await res.json();
      if (res.ok && json.success && Array.isArray(json.data?.items)) {
        const apiNotices: NoticeItem[] = json.data.items.map((n: any) => ({
          id: n._id || n.id || n.slug,
          _id: n._id,
          title: n.title,
          category: n.category || 'Academic',
          status: n.status || 'PUBLISHED',
          isImportant: Boolean(n.isImportant),
          date: n.publishedAt ? new Date(n.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          content: n.content,
          slug: n.slug,
        }));

        if (apiNotices.length > 0) {
          setNotices(apiNotices);
          saveStoredItems('nobel_cms_notices', apiNotices);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API notice fetch offline, using local storage:', err);
    }

    // Fallback to localStorage
    const stored = getStoredItems<NoticeItem>('nobel_cms_notices', DEFAULT_NOTICES);
    setNotices(stored);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
    window.addEventListener('storage', fetchNotices);
    return () => window.removeEventListener('storage', fetchNotices);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Admission');
  const [isImportant, setIsImportant] = useState(false);
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [saving, setSaving] = useState(false);

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

  const handleDelete = async (id: string, mongoId?: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      const updated = notices.filter((item) => item.id !== id);
      setNotices(updated);
      saveStoredItems('nobel_cms_notices', updated);

      if (mongoId) {
        try {
          await fetch(getApiUrl(`/api/v1/cms/notices/${mongoId}`), { method: 'DELETE' });
        } catch (e) {
          console.warn('Could not delete from API:', e);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const payload = {
      title,
      slug: slug || `notice-${Date.now()}`,
      content: title || 'Official notice from Nobel Multiple College.',
      category,
      isImportant,
      status,
      publishedAt: new Date().toISOString(),
    };

    let newNoticeItem: NoticeItem = {
      id: Date.now().toString(),
      title,
      category,
      isImportant,
      status,
      date: new Date().toISOString().split('T')[0],
      content: payload.content,
      slug: payload.slug,
    };

    // Save to MongoDB Atlas API
    try {
      const isEdit = Boolean(editingItem?._id);
      const url = isEdit ? getApiUrl(`/api/v1/cms/notices/${editingItem!._id}`) : getApiUrl('/api/v1/cms/notices');
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.data) {
        newNoticeItem._id = json.data._id;
        newNoticeItem.id = json.data._id || newNoticeItem.id;
      }
    } catch (err) {
      console.warn('Backend API offline, saved locally to persistent storage:', err);
    }

    // Save locally
    let updated: NoticeItem[];
    if (editingItem) {
      updated = notices.map((item) =>
        item.id === editingItem.id ? { ...item, ...newNoticeItem } : item
      );
    } else {
      updated = [newNoticeItem, ...notices];
    }

    setNotices(updated);
    saveStoredItems('nobel_cms_notices', updated);
    setSaving(false);
    setModalOpen(false);
  };

  return (
    <AdminLayout
      title="Notices & Announcements Manager"
      subtitle="Publish urgent announcements, examination routines, and official college circulars"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-nobel-navy-50 rounded-xl text-nobel-navy-700">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-nobel-navy-900">College Notice Board</h2>
              <p className="text-xs text-slate-500">Manage all notices broadcasted on the public portal and mobile screens</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchNotices}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Refresh from MongoDB database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-nobel-gold-600' : ''}`} />
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-nobel-navy-900 text-white hover:bg-nobel-navy-800 text-sm font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Publish New Notice
            </button>
          </div>
        </div>

        {/* Notices Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Notice Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-nobel-navy-900">{notice.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {notice.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{notice.date}</td>
                    <td className="px-6 py-4">
                      {notice.isImportant ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Urgent / High
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs text-slate-500 bg-slate-100">Normal</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          notice.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(notice)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-nobel-navy-900 hover:bg-slate-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id, notice._id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-nobel-navy-900">
                  {editingItem ? 'Edit Notice' : 'Publish New Notice'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Notice Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., SEE Entrance Examination Merit Scholarship Routine 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold-500"
                    >
                      <option value="Admission">Admission</option>
                      <option value="Academic">Academic</option>
                      <option value="Examination">Examination</option>
                      <option value="Scholarship">Scholarship</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold-500"
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isImportant"
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                    className="w-4 h-4 text-nobel-gold-600 rounded border-slate-300 focus:ring-nobel-gold-500"
                  />
                  <label htmlFor="isImportant" className="text-sm font-semibold text-slate-700">
                    Mark as Urgent / Important Announcement (Red Badge)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-nobel-navy-900 text-white hover:bg-nobel-navy-800 text-sm font-semibold flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Publishing to MongoDB...' : editingItem ? 'Save Changes' : 'Publish Notice'}
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

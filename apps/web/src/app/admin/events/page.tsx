'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Calendar, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { getStoredItems, addItem, updateItem, deleteItem } from '@/lib/storage';

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  status: 'PUBLISHED' | 'DRAFT';
}

const DEFAULT_EVENTS: EventItem[] = [
  { id: '1', title: 'Annual Inter-College IT & Science Exhibition 2026', date: '2026-09-15', location: 'Campus Main Hall', status: 'PUBLISHED' },
  { id: '2', title: 'Career Orientation & Placement Workshop for BBS & BCA', date: '2026-09-28', location: 'Auditorium Room 102', status: 'PUBLISHED' },
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');

  useEffect(() => {
    setEvents(getStoredItems<EventItem>('nobel_cms_events', DEFAULT_EVENTS));
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setDate('2026-10-01');
    setLocation('Campus Main Hall');
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (item: EventItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDate(item.date);
    setLocation(item.location);
    setStatus(item.status);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updated = deleteItem<EventItem>('nobel_cms_events', id, DEFAULT_EVENTS);
      setEvents(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updated = updateItem<EventItem>(
        'nobel_cms_events',
        editingItem.id,
        { title, date, location, status },
        DEFAULT_EVENTS
      );
      setEvents(updated);
    } else {
      const newItem: EventItem = {
        id: Date.now().toString(),
        title,
        date: date || new Date().toISOString().split('T')[0],
        location: location || 'Campus Auditorium',
        status,
      };
      const updated = addItem<EventItem>('nobel_cms_events', newItem, DEFAULT_EVENTS);
      setEvents(updated);
    }
    setModalOpen(false);
  };

  return (
    <AdminLayout
      title="Campus Events Calendar Management"
      subtitle="Organize workshops, science fairs, and academic seminars"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Upcoming Events</h2>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700/80 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-4 px-4">Event Title</th>
                <th className="py-4 px-4">Start Date</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-slate-900/40">
                  <td className="py-4 px-4 font-bold text-white">{e.title}</td>
                  <td className="py-4 px-4 text-slate-300">{e.date}</td>
                  <td className="py-4 px-4 text-slate-400">{e.location}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded font-bold text-[10px] border ${
                        e.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(e)}
                      className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
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
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Event' : 'Create Campus Event'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-amber-400"
                >
                  <Save className="w-4 h-4" />
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

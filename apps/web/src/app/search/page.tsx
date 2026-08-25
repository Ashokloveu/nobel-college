'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Search as SearchIcon, BookOpen, GraduationCap, FileText, Bell, Calendar } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      if (json.success) {
        setResults(json.data.results || []);
      }
    } catch (err) {
      // Demo mock search fallback
      const mockResults = [
        { type: 'program', title: 'Bachelor in Computer Application (BCA)', url: '/programs', description: '4-Year undergraduate program in computer applications.' },
        { type: 'program', title: '+2 Science Program', url: '/programs', description: 'Higher Secondary Science stream.' },
        { type: 'notice', title: 'Admissions Open for Session 2026', url: '/admission', description: 'Apply online for BCA, BBS, +2 Science & Management.' },
      ];
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-extrabold text-nobel-navy-900 heading-serif">
              Institutional Search Portal
            </h1>
            <p className="text-slate-600 text-sm">
              Search across programs, faculty, news, notices, events, and resources.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Type keywords (e.g. BCA, Admission, Science)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 shadow-sm text-sm outline-none focus:ring-2 focus:ring-nobel-navy-900 bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-nobel-navy-900 text-white font-bold text-sm hover:bg-nobel-navy-800 shadow transition"
            >
              Search
            </button>
          </form>

          {results.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Found {results.length} Search Results
              </h2>
              <div className="space-y-3">
                {results.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-nobel-navy-900">
                      <Link href={item.url} className="hover:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

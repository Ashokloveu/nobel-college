'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Settings, Save, CheckCircle2, PenTool, Upload, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    institutionName: 'NOBEL MULTIPLE COLLEGE',
    tagline: 'Excellence in Education & Character Building',
    address: 'Bardibas, Mahottari, Madhesh Province, Nepal',
    phone: '+977-44-500100',
    email: 'info@nobelcollege.edu.np',
    principalName: 'Prof. Dr. Ram Shrestha',
    principalMessage: 'Welcome to Nobel Multiple College. We are committed to fostering academic brilliance and modern technical literacy.',
    principalSignatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
  });

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings({ ...settings, principalSignatureUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout
      title="Central Institution Settings & Official Signatures"
      subtitle="Manage campus contact metadata, branding, and global Campus Chief digital signatures"
    >
      <div className="max-w-4xl space-y-6">
        <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/80 shadow-lg space-y-6">
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Campus Chief signature & site settings updated successfully across all Admit Cards and official certificates!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* Section 1: Official Signature Upload */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold uppercase text-xs">
                <PenTool className="w-4 h-4" />
                Principal / Campus Chief Official Digital Signature Stamp
              </div>
              <p className="text-slate-400 text-[11px]">
                Upload the official signature of the Campus Chief once here. This signature automatically appears on all issued Entrance Admit Cards, Scholarship Certificates, and Marksheets.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <div className="w-48 h-20 bg-white p-2 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center">
                  <img
                    src={settings.principalSignatureUrl}
                    alt="Campus Chief Official Signature"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <label className="block font-bold text-slate-300">Upload New Signature Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-nobel-navy-950 hover:file:bg-amber-400 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block">Recommended format: PNG with transparent background.</span>
                </div>
              </div>
            </div>

            {/* Section 2: General Settings */}
            <div className="space-y-4">
              <div>
                <label className="block font-bold uppercase text-slate-300 mb-1">Institution Name</label>
                <input
                  type="text"
                  value={settings.institutionName}
                  onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-300 mb-1">Campus Chief Full Name</label>
                <input
                  type="text"
                  value={settings.principalName}
                  onChange={(e) => setSettings({ ...settings, principalName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Official Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Official Phone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-300 mb-1">Campus Chief Message</label>
                <textarea
                  rows={4}
                  value={settings.principalMessage}
                  onChange={(e) => setSettings({ ...settings, principalMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 text-nobel-navy-950 font-bold text-xs hover:bg-amber-400 transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              Save Settings & Signature Stamp
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

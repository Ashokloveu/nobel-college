'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Inbox,
  FileText,
  Bell,
  Calendar,
  GraduationCap,
  Building2,
  FolderKanban,
  Download,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  UserCheck,
  Award,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Entrance Approvals', href: '/admin/entrance-applications', icon: Award, badge: 'New Reg' },
    { label: 'Admission CRM', href: '/admin/admissions', icon: Users, badge: '12 New' },
    { label: 'Contact Inbox', href: '/admin/contacts', icon: Inbox, badge: '5 Unread' },
    { label: 'News Articles', href: '/admin/news', icon: FileText },
    { label: 'Official Notices', href: '/admin/notices', icon: Bell },
    { label: 'Campus Events', href: '/admin/events', icon: Calendar },
    { label: 'Degree Programs', href: '/admin/programs', icon: GraduationCap },
    { label: 'Departments', href: '/admin/departments', icon: Building2 },
    { label: 'Faculty Directory', href: '/admin/faculty', icon: UserCheck },
    { label: 'Media Gallery', href: '/admin/gallery', icon: FolderKanban },
    { label: 'Downloads & Forms', href: '/admin/downloads', icon: Download },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'Staff & Roles', href: '/admin/users', icon: ShieldCheck },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: Lock },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-amber-500 text-nobel-navy-950 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-sm heading-serif">
            NOBEL ADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-nobel-navy-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-white text-sm tracking-tight heading-serif block">
              NOBEL COLLEGE
            </span>
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
              Bardibas • Admin Portal
            </span>
          </div>
        </div>

        {/* User Profile Quick Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-nobel-navy-800 text-amber-400 flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name[0] : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {user?.role || 'SUPER_ADMIN'}
            </div>
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition group ${
                  isActive
                    ? 'bg-nobel-navy-800 text-white font-bold shadow-md shadow-nobel-navy-900/50 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition ${isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                      isActive ? 'bg-amber-400 text-nobel-navy-950' : 'bg-nobel-crimson/80 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Link */}
        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              View Public Website
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-950/40 hover:bg-nobel-crimson text-red-300 hover:text-white text-xs font-bold transition border border-red-900/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Top Header Bar */}
        <header className="hidden lg:flex bg-slate-950 border-b border-slate-800 px-8 py-4 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white heading-serif">{title}</h1>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Global admin search..."
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none w-64"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Session Active • Bardibas, Nepal</span>
            </div>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

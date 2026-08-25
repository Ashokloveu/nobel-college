import { UserRole, PermissionCode } from '@nobel/types';

export const ALL_PERMISSIONS: PermissionCode[] = [
  'users.read', 'users.create', 'users.update', 'users.delete',
  'roles.read', 'roles.create', 'roles.update', 'roles.delete',
  'admissions.read', 'admissions.update', 'admissions.assign', 'admissions.delete',
  'contacts.read', 'contacts.update', 'contacts.delete',
  'programs.read', 'programs.create', 'programs.update', 'programs.delete',
  'departments.read', 'departments.create', 'departments.update', 'departments.delete',
  'faculty.read', 'faculty.create', 'faculty.update', 'faculty.delete',
  'pages.read', 'pages.create', 'pages.update', 'pages.delete',
  'news.read', 'news.create', 'news.update', 'news.publish', 'news.delete',
  'notices.read', 'notices.create', 'notices.update', 'notices.publish', 'notices.delete',
  'events.read', 'events.create', 'events.update', 'events.publish', 'events.delete',
  'gallery.read', 'gallery.create', 'gallery.update', 'gallery.delete',
  'media.upload', 'media.delete',
  'downloads.read', 'downloads.create', 'downloads.update', 'downloads.delete',
  'navigation.read', 'navigation.update',
  'settings.read', 'settings.update',
  'seo.read', 'seo.update',
  'audit.read',
];

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, PermissionCode[]> = {
  [UserRole.SUPER_ADMIN]: ALL_PERMISSIONS,

  [UserRole.ADMINISTRATOR]: ALL_PERMISSIONS.filter(
    (p) => p !== 'roles.delete' && p !== 'users.delete'
  ),

  [UserRole.ADMISSION_OFFICER]: [
    'admissions.read',
    'admissions.update',
    'admissions.assign',
    'contacts.read',
    'contacts.update',
    'programs.read',
    'departments.read',
    'faculty.read',
  ],

  [UserRole.CONTENT_MANAGER]: [
    'programs.read', 'programs.create', 'programs.update',
    'departments.read', 'departments.create', 'departments.update',
    'faculty.read', 'faculty.create', 'faculty.update',
    'pages.read', 'pages.create', 'pages.update',
    'news.read', 'news.create', 'news.update', 'news.publish',
    'notices.read', 'notices.create', 'notices.update', 'notices.publish',
    'events.read', 'events.create', 'events.update', 'events.publish',
    'gallery.read', 'gallery.create', 'gallery.update',
    'media.upload', 'media.delete',
    'downloads.read', 'downloads.create', 'downloads.update',
    'navigation.read', 'navigation.update',
    'seo.read', 'seo.update',
  ],

  [UserRole.EDITOR]: [
    'news.read', 'news.create', 'news.update',
    'notices.read', 'notices.create', 'notices.update',
    'events.read', 'events.create', 'events.update',
    'gallery.read', 'gallery.create',
    'media.upload',
  ],
};

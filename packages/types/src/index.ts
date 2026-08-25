// API Common Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginatedMeta;
}

// User & Auth Types
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMINISTRATOR = 'ADMINISTRATOR',
  ADMISSION_OFFICER = 'ADMISSION_OFFICER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
  EDITOR = 'EDITOR',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isTwoFactorEnabled: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: IUser;
  tokens: AuthTokens;
  requiresTwoFactor?: boolean;
}

// System Permissions
export type PermissionCode =
  | 'users.read' | 'users.create' | 'users.update' | 'users.delete'
  | 'roles.read' | 'roles.create' | 'roles.update' | 'roles.delete'
  | 'admissions.read' | 'admissions.update' | 'admissions.assign' | 'admissions.delete'
  | 'contacts.read' | 'contacts.update' | 'contacts.delete'
  | 'programs.read' | 'programs.create' | 'programs.update' | 'programs.delete'
  | 'departments.read' | 'departments.create' | 'departments.update' | 'departments.delete'
  | 'faculty.read' | 'faculty.create' | 'faculty.update' | 'faculty.delete'
  | 'pages.read' | 'pages.create' | 'pages.update' | 'pages.delete'
  | 'news.read' | 'news.create' | 'news.update' | 'news.publish' | 'news.delete'
  | 'notices.read' | 'notices.create' | 'notices.update' | 'notices.publish' | 'notices.delete'
  | 'events.read' | 'events.create' | 'events.update' | 'events.publish' | 'events.delete'
  | 'gallery.read' | 'gallery.create' | 'gallery.update' | 'gallery.delete'
  | 'media.upload' | 'media.delete'
  | 'downloads.read' | 'downloads.create' | 'downloads.update' | 'downloads.delete'
  | 'navigation.read' | 'navigation.update'
  | 'settings.read' | 'settings.update'
  | 'seo.read' | 'seo.update'
  | 'audit.read';

// Admission Inquiry CRM Types
export enum AdmissionStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  FOLLOW_UP = 'FOLLOW_UP',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
  ARCHIVED = 'ARCHIVED',
}

export interface IInquiryNote {
  _id?: string;
  note: string;
  addedBy: string | IUser;
  createdAt: Date;
}

export interface IAdmissionInquiry {
  _id: string;
  inquiryNumber: string; // e.g. NMC-2026-000001
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  programId: string | IProgram;
  qualification: string;
  message?: string;
  source: string;
  status: AdmissionStatus;
  assignedTo?: string | IUser;
  isPossibleDuplicate: boolean;
  duplicateOf?: string;
  notes: IInquiryNote[];
  followUpAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Inbox Types
export enum ContactStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  REPLIED = 'REPLIED',
  ARCHIVED = 'ARCHIVED',
}

export interface IContactMessage {
  _id: string;
  referenceNumber: string; // e.g. MSG-2026-000001
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  assignedTo?: string | IUser;
  notes: IInquiryNote[];
  createdAt: Date;
  updatedAt: Date;
}

// Academic Types
export enum ProgramLevel {
  DIPLOMA = '+2 / DIPLOMA',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
}

export interface IProgram {
  _id: string;
  title: string;
  slug: string;
  level: ProgramLevel;
  departmentId: string | IDepartment;
  duration: string;
  description: string;
  curriculum?: string;
  careerOpportunities?: string;
  feeStructure?: string;
  featured: boolean;
  status: 'PUBLISHED' | 'DRAFT';
  createdAt: Date;
  updatedAt: Date;
}

export interface IDepartment {
  _id: string;
  name: string;
  slug: string;
  code: string;
  description: string;
  headOfDepartment?: string;
  email?: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

export interface IFaculty {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  departmentId: string | IDepartment;
  email?: string;
  phone?: string;
  qualification: string;
  biography?: string;
  photoUrl?: string;
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

// CMS Types
export enum ContentStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface INews {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl?: string;
  category: string;
  tags: string[];
  authorId: string | IUser;
  publishedAt: Date;
  featured: boolean;
  status: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotice {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  attachmentUrl?: string;
  isImportant: boolean;
  publishedAt: Date;
  expiresAt?: Date;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  location: string;
  coverImageUrl?: string;
  organizer: string;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImageUrl?: string;
  status: ContentStatus;
  order: number;
  imageCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGalleryImage {
  _id: string;
  albumId: string | IGalleryAlbum;
  imageUrl: string;
  caption?: string;
  order: number;
  fileSize?: number;
  mimeType?: string;
  createdAt: Date;
}

export interface IDownload {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  downloadCount: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMedia {
  _id: string;
  filename: string;
  storageKey: string;
  url: string;
  mimeType: string;
  fileSize: number;
  altText?: string;
  uploaderId: string | IUser;
  category?: string;
  createdAt: Date;
}

// Navigation & Settings Types
export interface INavigation {
  _id: string;
  label: string;
  url: string;
  type: 'HEADER' | 'FOOTER' | 'QUICK_LINK';
  parentId?: string;
  order: number;
  target?: '_self' | '_blank';
  isVisible: boolean;
}

export interface ISiteSettings {
  institutionName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  mapEmbedUrl?: string;
  principalName: string;
  principalMessage: string;
  principalPhotoUrl?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
  };
  footerText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

// Audit Log Types
export interface IAuditLog {
  _id: string;
  actorId?: string | IUser;
  actorEmail?: string;
  action: string;
  module: string;
  recordId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  timestamp: Date;
}

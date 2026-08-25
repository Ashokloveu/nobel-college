import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  twoFactorCode: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const verifyTwoFactorSchema = z.object({
  code: z.string().length(6, '2FA code must be exactly 6 digits'),
});

export const userCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['SUPER_ADMIN', 'ADMINISTRATOR', 'ADMISSION_OFFICER', 'CONTENT_MANAGER', 'EDITOR']),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMINISTRATOR', 'ADMISSION_OFFICER', 'CONTENT_MANAGER', 'EDITOR']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']).optional(),
});

// Admission CRM Schema
export const admissionInquirySchema = z.object({
  applicantName: z.string().min(2, 'Applicant name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits'),
  address: z.string().min(3, 'Address is required'),
  programId: z.string().min(1, 'Program selection is required'),
  qualification: z.string().min(2, 'Qualification is required'),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
  source: z.string().default('WEBSITE'),
});

export const admissionStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'LOST', 'ARCHIVED']),
  assignedTo: z.string().optional(),
  followUpAt: z.string().datetime().optional().nullable(),
  note: z.string().optional(),
});

// Contact Message Schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const contactStatusUpdateSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']),
  assignedTo: z.string().optional(),
  note: z.string().optional(),
});

// Academic Schemas
export const programSchema = z.object({
  title: z.string().min(2, 'Program title is required'),
  slug: z.string().min(2, 'Slug is required'),
  level: z.enum(['+2 / DIPLOMA', 'BACHELOR', 'MASTER']),
  departmentId: z.string().min(1, 'Department is required'),
  duration: z.string().min(1, 'Duration is required'),
  description: z.string().min(10, 'Description is required'),
  curriculum: z.string().optional(),
  careerOpportunities: z.string().optional(),
  feeStructure: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('PUBLISHED'),
});

export const departmentSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
  slug: z.string().min(2, 'Slug is required'),
  code: z.string().min(2, 'Code is required'),
  description: z.string().min(5, 'Description is required'),
  headOfDepartment: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export const facultySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  designation: z.string().min(2, 'Designation is required'),
  departmentId: z.string().min(1, 'Department is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  qualification: z.string().min(2, 'Qualification is required'),
  biography: z.string().optional(),
  photoUrl: z.string().optional(),
  order: z.number().int().default(0),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

// CMS Schemas
export const newsSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  summary: z.string().min(10, 'Summary is required'),
  content: z.string().min(20, 'Content is required'),
  coverImageUrl: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  publishedAt: z.string().datetime().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const noticeSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  content: z.string().min(10, 'Content is required'),
  category: z.string().min(2, 'Category is required'),
  attachmentUrl: z.string().optional(),
  isImportant: z.boolean().default(false),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  publishedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export const eventSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().nullable(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  coverImageUrl: z.string().optional(),
  organizer: z.string().min(2, 'Organizer is required'),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
});

export const galleryAlbumSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  order: z.number().int().default(0),
});

export const downloadSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  fileUrl: z.string().min(1, 'File URL is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z.string().min(1, 'File size is required'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
});

// Settings & Navigation Schemas
export const siteSettingsSchema = z.object({
  institutionName: z.string().min(2),
  tagline: z.string().min(2),
  logoUrl: z.string(),
  faviconUrl: z.string().optional(),
  address: z.string().min(2),
  phone: z.string().min(2),
  email: z.string().email(),
  website: z.string().url(),
  mapEmbedUrl: z.string().optional(),
  principalName: z.string().min(2),
  principalMessage: z.string().min(10),
  principalPhotoUrl: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
  }),
  footerText: z.string(),
  defaultSeoTitle: z.string(),
  defaultSeoDescription: z.string(),
});

# Nobel Multiple College - Digital Institutional Platform

**Location**: Bardibas, Mahottari, Madhesh Province, Nepal  
**Technology Stack**: Next.js 14, React 18, TypeScript, Express.js, MongoDB (Mongoose), Tailwind CSS, TanStack Query, Zod.

---

## 🌟 Platform Capabilities

1. **Public Institution Portal**:
   - Modern, responsive homepage with dynamic CMS-driven sections.
   - Accredited Academic Programs (`/programs`, `/programs/[slug]`).
   - Campus Departments (`/departments`, `/departments/[slug]`).
   - Faculty & Leadership Directory (`/faculty`, `/faculty/[slug]`).
   - Official News & Notices (`/news`, `/notices`, `/events`).
   - Photo & Video Gallery (`/gallery`, `/gallery/[slug]`).
   - Downloadable Student Resources (`/downloads`).
   - Unified Cross-Entity Search (`/search?q=`).

2. **Online Admission Inquiry CRM**:
   - Public application submission (`/admission`) generating inquiry reference numbers (`NMC-2026-XXXXXX`).
   - Automated duplicate inquiry detection tagging (`isPossibleDuplicate`).
   - Admin CRM Pipeline (`/admin/admissions`): Status tracking (`NEW`, `CONTACTED`, `FOLLOW_UP`, `CONVERTED`, `LOST`), officer assignment, follow-up scheduling, and internal activity notes.

3. **Contact Inbox Management**:
   - Public contact form (`/contact`) generating tracking codes (`MSG-2026-XXXXXX`).
   - Admin inbox (`/admin/contacts`) with read/unread tracking and assignment.

4. **Security & Administrative Governance**:
   - Multi-factor TOTP 2FA authentication (`/api/v1/auth/2fa/*`).
   - Server-side Role-Based Access Control (RBAC) supporting `SUPER_ADMIN`, `ADMINISTRATOR`, `ADMISSION_OFFICER`, `CONTENT_MANAGER`, `EDITOR`.
   - Automated Audit Trail logging all administrative operations into `auditLogs` collection.

---

## 📁 Repository Structure

```
/
├── apps/
│   ├── api/                     # Express.js + TypeScript + Mongoose Backend
│   └── web/                     # Next.js 14 App Router Frontend
├── packages/
│   ├── types/                   # @nobel/types (Shared TypeScript domain interfaces)
│   ├── validation/              # @nobel/validation (Shared Zod schemas)
│   ├── ui/                      # @nobel/ui (Shared UI components)
│   └── config/                  # @nobel/config (Shared configs)
├── docs/                        # Complete technical & deployment guides
└── scripts/                     # Seed and backup scripts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v20.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/nobel_college_db`) or MongoDB Atlas URI.

### 2. Installation
```bash
# Clone repository
git clone https://github.com/nobel-college/institutional-platform.git
cd institutional-platform

# Install root & workspace dependencies
npm install

# Compile shared packages
npm run build:packages
```

### 3. Seed Initial Database Content
```bash
npm run seed
```
*Creates initial Super Admin user (`admin@nobelcollege.edu.np` / `Admin@Nobel2026!`), system roles, sample programs, departments, faculty, and default settings.*

### 4. Run Development Servers
```bash
# Start Express API (Port 5000) and Next.js Web (Port 3000) concurrently
npm run dev
```

- **Public Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📑 Technical Documentation

- 📘 [Production Deployment Guide](docs/deployment.md)
- 📗 [API Specification & Endpoints](docs/api-documentation.md)
- 📙 [Administrator User Guide](docs/administrator-guide.md)
- 📕 [Security & Automated Backup Guide](docs/security-backup-guide.md)
- 📑 [QA & Verification Matrix](docs/qa-report.md)

---

## 🛡️ Content Policy
All official college statistics, contact details, and fee structures requiring institution verification are marked with `CONTENT_REQUIRES_VERIFICATION` in seeds and CMS defaults per project guidelines.

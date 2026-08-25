# Institutional Administrator Guide - Nobel Multiple College

## 1. Accessing Admin Portal
- **URL**: `https://nobelcollege.edu.np/admin/login`
- **Initial Credentials**:
  - **Email**: `admin@nobelcollege.edu.np`
  - **Password**: `Admin@Nobel2026!`
- **Note**: Change initial password upon first login and enroll in 2FA via `/api/v1/auth/2fa/setup`.

---

## 2. Roles & Permission Levels

1. **SUPER_ADMIN**: Full platform authority across system settings, user management, and database logs.
2. **ADMINISTRATOR**: Managing staff, reviewing audit logs, and overseeing all academic and CMS modules.
3. **ADMISSION_OFFICER**: Accessing Admission Inquiry CRM (`/admin/admissions`), contacting applicants, updating inquiry status, scheduling follow-ups, and adding internal notes.
4. **CONTENT_MANAGER**: Creating, editing, and publishing news, notices, events, programs, departments, faculty profiles, and media gallery items.
5. **EDITOR**: Drafting news articles, notices, and events pending manager approval.

---

## 3. Admission Inquiry CRM Management

1. Go to `/admin/admissions`.
2. Filter inquiries by status (`NEW`, `CONTACTED`, `FOLLOW_UP`, `CONVERTED`, `LOST`).
3. Inspect duplicate flag tag (`Possible Duplicate`).
4. Click **Manage** on any record to assign an admission officer, set follow-up reminder dates, and record phone log notes.

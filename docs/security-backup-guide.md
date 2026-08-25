# Security & Automated Backup Guide - Nobel Multiple College

## 1. Security Architecture

- **Authentication**: JWT access tokens (15 min lifespan) stored in memory + HTTP-only, SameSite refresh token cookies (7 days).
- **Two-Factor Authentication (2FA)**: Time-based One-Time Passwords (TOTP) supported via Google Authenticator or Authy.
- **Role-Based Access Control (RBAC)**: Enforced server-side on all administrative Express endpoints.
- **Audit Trail**: All administrative actions logged to `auditLogs` collection containing actor ID, IP address, user-agent, action code, and sanitized payload.
- **Request Throttling**: Express rate limiting protecting public forms and auth endpoints against brute-force attacks.

---

## 2. Automated MongoDB Backup Strategy

The backup script in `scripts/backup.ts` performs daily automated mongodump snapshots with gzip compression and retention management.

### Run Manual Backup:
```bash
npx tsx scripts/backup.ts
```

### Restore Database from Snapshot:
```bash
npx tsx scripts/restore.ts --file ./backups/nobel_db_2026-08-24.tar.gz
```

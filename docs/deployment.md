# Production Deployment Guide - Nobel Multiple College

## 1. Overview
This document outlines the step-by-step procedure for deploying the **Nobel Multiple College Digital Institutional Platform** to a production Linux environment (e.g. Ubuntu 22.04 LTS / AWS / DigitalOcean / Vercel + Railway).

---

## 2. Infrastructure Requirements
- **Frontend App (`apps/web`)**: Next.js 14 deployed to Vercel, Node.js server, or PM2 cluster.
- **Backend API (`apps/api`)**: Node.js v20+, Express.js TypeScript server managed via PM2 or Docker.
- **Database**: Managed MongoDB Atlas Cluster (v7.0+) with TLS/SSL encryption and automated daily snapshots.
- **File Storage**: Amazon S3 / Cloudflare R2 / Local persistent upload mount directory.
- **Domain & SSL**: Cloudflare CDN + Let's Encrypt Wildcard SSL certificate.

---

## 3. Environment Variable Configuration (`.env`)

```env
NODE_ENV=production
PORT=5000
APP_URL=https://nobelcollege.edu.np
API_URL=https://api.nobelcollege.edu.np

MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/nobel_college_prod?retryWrites=true&w=majority

JWT_SECRET=prod_super_secure_random_hash_key_2026_nobel
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=prod_super_secure_refresh_hash_key_2026_nobel
REFRESH_TOKEN_EXPIRES_IN=7d
COOKIE_SECRET=prod_cookie_encrypt_key_nobel

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.your_production_sendgrid_key
EMAIL_FROM="Nobel Multiple College <info@nobelcollege.edu.np>"

STORAGE_TYPE=s3
STORAGE_ENDPOINT=https://nobel-media-bucket.s3.ap-south-1.amazonaws.com
```

---

## 4. Build & Deployment Steps

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/nobel-college/institutional-platform.git
   cd institutional-platform
   npm install
   ```

2. **Compile Shared Packages**:
   ```bash
   npm run build:packages
   ```

3. **Build Backend API & Run Seed**:
   ```bash
   npm --prefix apps/api run build
   npm --prefix apps/api run seed
   ```

4. **Start Backend API with PM2**:
   ```bash
   pm2 start apps/api/dist/server.js --name "nobel-api" --instances max --exec-mode cluster
   ```

5. **Build Next.js Frontend**:
   ```bash
   npm --prefix apps/web run build
   pm2 start "npm --prefix apps/web run start" --name "nobel-web"
   ```

6. **Nginx Reverse Proxy Setup**:
   ```nginx
   server {
       server_name nobelcollege.edu.np www.nobelcollege.edu.np;
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

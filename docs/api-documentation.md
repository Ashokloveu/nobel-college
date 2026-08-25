# API Documentation - Nobel Multiple College Platform (`/api/v1`)

## 1. Authentication Endpoints

### `POST /api/v1/auth/login`
- **Request Body**: `{ "email": "admin@nobelcollege.edu.np", "password": "..." }`
- **Response**: Returns JWT Access Token, sets HTTP-only Refresh Token cookie, returns user details & role.

### `GET /api/v1/auth/me`
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response**: Returns authenticated user profile and permissions list.

### `POST /api/v1/auth/2fa/setup`
- **Response**: Generates TOTP secret & base64 QR Code string for authenticator enrollment.

---

## 2. Admission CRM Endpoints

### `POST /api/v1/admissions` (Public)
- **Payload**: `{ "applicantName": "...", "email": "...", "phone": "...", "address": "...", "programId": "..." }`
- **Response**: Generates inquiry number (e.g., `NMC-2026-000101`) and flags potential duplicates.

### `GET /api/v1/admissions` (Admin)
- **Query Params**: `page`, `limit`, `status`, `search`, `duplicatesOnly`
- **Response**: Paginated list of admission records with assigned officer and internal notes.

### `PATCH /api/v1/admissions/:id/status` (Admin)
- **Payload**: `{ "status": "CONTACTED", "assignedTo": "...", "followUpAt": "...", "note": "..." }`

---

## 3. Academic & CMS Endpoints

- `GET /api/v1/academics/departments`: List active departments.
- `GET /api/v1/academics/programs`: List published programs.
- `GET /api/v1/cms/news`: List published news articles.
- `GET /api/v1/cms/notices`: List official bulletins & notices.
- `GET /api/v1/cms/events`: List college calendar events.
- `GET /api/v1/search?q=`: Cross-entity search.

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ENV } from './config/env';
import { errorHandler } from './middlewares/error.middleware';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import roleRoutes from './routes/role.routes';
import auditLogRoutes from './routes/auditLog.routes';
import academicRoutes from './routes/academic.routes';
import admissionRoutes from './routes/admission.routes';
import contactRoutes from './routes/contact.routes';
import cmsRoutes from './routes/cms.routes';
import searchRoutes from './routes/search.routes';

export const createApp = (): express.Application => {
  const app = express();

  // Security Headers & CORS
  app.use(helmet());
  app.use(
    cors({
      origin: [ENV.APP_URL, 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body Parsing & Cookies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser(ENV.COOKIE_SECRET));

  // Static files upload directory
  app.use('/uploads', express.static(path.resolve(ENV.STORAGE.UPLOAD_DIR)));

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      institution: 'Nobel Multiple College, Bardibas, Nepal',
    });
  });

  // Base API v1 status
  app.get('/api/v1', (_req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'Nobel Multiple College API v1 Digital Institutional Platform',
    });
  });

  // API v1 Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/roles', roleRoutes);
  app.use('/api/v1/audit-logs', auditLogRoutes);
  app.use('/api/v1/academics', academicRoutes);
  app.use('/api/v1/admissions', admissionRoutes);
  app.use('/api/v1/contact', contactRoutes);
  app.use('/api/v1/cms', cmsRoutes);
  app.use('/api/v1/search', searchRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

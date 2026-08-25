import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import { ENV } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'An unexpected server error occurred.';
  let details: any[] | undefined = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = err.message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'INVALID_ID';
    message = 'Invalid resource identifier format.';
  }

  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.url} - 500 Error: ${err.message}`, { stack: err.stack });
  } else {
    logger.warn(`[${req.method}] ${req.url} - ${statusCode} ${errorCode}: ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details ? { details } : {}),
      ...(ENV.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    },
  });
};

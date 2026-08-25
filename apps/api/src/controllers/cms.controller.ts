import { Request, Response, NextFunction } from 'express';
import { News } from '../models/news.model';
import { Notice } from '../models/notice.model';
import { Event } from '../models/event.model';
import { Page } from '../models/page.model';
import { GalleryAlbum, GalleryImage } from '../models/gallery.model';
import { Download } from '../models/download.model';
import { newsSchema, noticeSchema, eventSchema, galleryAlbumSchema, downloadSchema } from '@nobel/validation';
import { NotFoundError, ConflictError } from '../utils/errors';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class CmsController {
  // --- NEWS ---
  static async listNews(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const skip = (page - 1) * limit;

      const query: any = {};
      if (req.query.status) query.status = req.query.status;
      if (req.query.featured === 'true') query.featured = true;
      if (req.query.category) query.category = req.query.category;

      const total = await News.countDocuments(query);
      const items = await News.find(query)
        .populate('authorId', 'name email')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: {
          items,
          meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getNewsBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await News.findOne({ slug: req.params.slug }).populate('authorId', 'name email');
      if (!news) throw new NotFoundError('News article not found');
      res.json({ success: true, data: news });
    } catch (err) {
      next(err);
    }
  }

  static async createNews(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const data = newsSchema.parse(req.body);
      const existing = await News.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('News slug already exists');

      const news = await News.create({
        ...data,
        authorId: req.user!.userId,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      });

      res.status(201).json({ success: true, message: 'News article created', data: news });
    } catch (err) {
      next(err);
    }
  }

  static async updateNews(req: Request, res: Response, next: NextFunction) {
    try {
      const data = newsSchema.partial().parse(req.body);
      const news = await News.findByIdAndUpdate(req.params.id, data, { new: true });
      if (!news) throw new NotFoundError('News article not found');
      res.json({ success: true, message: 'News updated', data: news });
    } catch (err) {
      next(err);
    }
  }

  static async deleteNews(req: Request, res: Response, next: NextFunction) {
    try {
      const news = await News.findByIdAndDelete(req.params.id);
      if (!news) throw new NotFoundError('News article not found');
      res.json({ success: true, message: 'News article deleted' });
    } catch (err) {
      next(err);
    }
  }

  // --- NOTICES ---
  static async listNotices(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const skip = (page - 1) * limit;

      const query: any = {};
      if (req.query.status) query.status = req.query.status;
      if (req.query.important === 'true') query.isImportant = true;

      const total = await Notice.countDocuments(query);
      const items = await Notice.find(query)
        .sort({ isImportant: -1, publishedAt: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: {
          items,
          meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getNoticeBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await Notice.findOne({ slug: req.params.slug });
      if (!notice) throw new NotFoundError('Notice not found');
      res.json({ success: true, data: notice });
    } catch (err) {
      next(err);
    }
  }

  static async createNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const data = noticeSchema.parse(req.body);
      const existing = await Notice.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('Notice slug already exists');

      const notice = await Notice.create({
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      });

      res.status(201).json({ success: true, message: 'Notice published', data: notice });
    } catch (err) {
      next(err);
    }
  }

  static async updateNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const data = noticeSchema.partial().parse(req.body);
      const notice = await Notice.findByIdAndUpdate(req.params.id, data, { new: true });
      if (!notice) throw new NotFoundError('Notice not found');
      res.json({ success: true, message: 'Notice updated', data: notice });
    } catch (err) {
      next(err);
    }
  }

  static async deleteNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const notice = await Notice.findByIdAndDelete(req.params.id);
      if (!notice) throw new NotFoundError('Notice not found');
      res.json({ success: true, message: 'Notice deleted' });
    } catch (err) {
      next(err);
    }
  }

  // --- EVENTS ---
  static async listEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const query: any = {};
      if (req.query.status) query.status = req.query.status;

      const events = await Event.find(query).sort({ startDate: 1 });
      res.json({ success: true, data: events });
    } catch (err) {
      next(err);
    }
  }

  static async getEventBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await Event.findOne({ slug: req.params.slug });
      if (!event) throw new NotFoundError('Event not found');
      res.json({ success: true, data: event });
    } catch (err) {
      next(err);
    }
  }

  static async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = eventSchema.parse(req.body);
      const existing = await Event.findOne({ slug: data.slug });
      if (existing) throw new ConflictError('Event slug already exists');

      const event = await Event.create({
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      });

      res.status(201).json({ success: true, message: 'Event created', data: event });
    } catch (err) {
      next(err);
    }
  }

  // --- GALLERY ALBUMS ---
  static async listGalleryAlbums(_req: Request, res: Response, next: NextFunction) {
    try {
      const albums = await GalleryAlbum.find({ status: 'PUBLISHED' }).sort({ order: 1 });
      res.json({ success: true, data: albums });
    } catch (err) {
      next(err);
    }
  }

  static async getGalleryAlbumBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const album = await GalleryAlbum.findOne({ slug: req.params.slug });
      if (!album) throw new NotFoundError('Gallery album not found');

      const images = await GalleryImage.find({ albumId: album._id }).sort({ order: 1 });
      res.json({ success: true, data: { album, images } });
    } catch (err) {
      next(err);
    }
  }

  static async createGalleryAlbum(req: Request, res: Response, next: NextFunction) {
    try {
      const data = galleryAlbumSchema.parse(req.body);
      const album = await GalleryAlbum.create(data);
      res.status(201).json({ success: true, message: 'Gallery album created', data: album });
    } catch (err) {
      next(err);
    }
  }

  // --- DOWNLOADS ---
  static async listDownloads(req: Request, res: Response, next: NextFunction) {
    try {
      const query: any = { status: 'PUBLISHED' };
      if (req.query.category) query.category = req.query.category;

      const downloads = await Download.find(query).sort({ createdAt: -1 });
      res.json({ success: true, data: downloads });
    } catch (err) {
      next(err);
    }
  }

  static async incrementDownloadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const dl = await Download.findByIdAndUpdate(
        req.params.id,
        { $inc: { downloadCount: 1 } },
        { new: true }
      );
      if (!dl) throw new NotFoundError('Download resource not found');
      res.json({ success: true, data: dl });
    } catch (err) {
      next(err);
    }
  }

  static async createDownload(req: Request, res: Response, next: NextFunction) {
    try {
      const data = downloadSchema.parse(req.body);
      const dl = await Download.create(data);
      res.status(201).json({ success: true, message: 'Download resource published', data: dl });
    } catch (err) {
      next(err);
    }
  }
}

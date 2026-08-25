import { Request, Response, NextFunction } from 'express';
import { ContactMessage } from '../models/contactMessage.model';
import { contactMessageSchema, contactStatusUpdateSchema } from '@nobel/validation';
import { NotFoundError } from '../utils/errors';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class ContactController {
  /**
   * Public contact form submission
   */
  static async submitPublicContact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = contactMessageSchema.parse(req.body);

      // Generate reference number MSG-2026-XXXXXX
      const year = new Date().getFullYear();
      const count = await ContactMessage.countDocuments();
      const seq = (count + 1).toString().padStart(6, '0');
      const referenceNumber = `MSG-${year}-${seq}`;

      const message = await ContactMessage.create({
        referenceNumber,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });

      res.status(201).json({
        success: true,
        message: 'Your contact message has been received.',
        data: {
          referenceNumber: message.referenceNumber,
          createdAt: message.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Admin contact inbox listing
   */
  static async listAdminContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const skip = (page - 1) * limit;

      const query: any = {};
      if (req.query.status) query.status = req.query.status;

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search as string, 'i');
        query.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { subject: searchRegex },
          { referenceNumber: searchRegex },
        ];
      }

      const total = await ContactMessage.countDocuments(query);
      const items = await ContactMessage.find(query)
        .populate('assignedTo', 'name email role')
        .populate('notes.addedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        success: true,
        data: {
          items,
          meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get contact by ID & auto-mark READ
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const msg = await ContactMessage.findById(req.params.id)
        .populate('assignedTo', 'name email role')
        .populate('notes.addedBy', 'name email');

      if (!msg) throw new NotFoundError('Contact message not found');

      if (msg.status === 'UNREAD') {
        msg.status = 'READ' as any;
        await msg.save();
      }

      res.json({ success: true, data: msg });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update status & add notes
   */
  static async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const data = contactStatusUpdateSchema.parse(req.body);
      const msg = await ContactMessage.findById(req.params.id);
      if (!msg) throw new NotFoundError('Contact message not found');

      msg.status = data.status as any;
      if (data.assignedTo !== undefined) msg.assignedTo = data.assignedTo || undefined;

      if (data.note && data.note.trim()) {
        msg.notes.push({
          note: data.note.trim(),
          addedBy: req.user!.userId as any,
          createdAt: new Date(),
        });
      }

      await msg.save();

      res.json({ success: true, message: 'Contact record updated', data: msg });
    } catch (err) {
      next(err);
    }
  }
}

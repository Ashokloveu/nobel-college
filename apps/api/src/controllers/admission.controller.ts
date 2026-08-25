import { Request, Response, NextFunction } from 'express';
import { AdmissionInquiry } from '../models/admissionInquiry.model';
import { Program } from '../models/program.model';
import { admissionInquirySchema, admissionStatusUpdateSchema } from '@nobel/validation';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class AdmissionController {
  /**
   * Public admission inquiry submission
   */
  static async submitPublicInquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const data = admissionInquirySchema.parse(req.body);

      // Verify program exists
      const program = await Program.findById(data.programId);
      if (!program) throw new BadRequestError('Selected academic program is invalid');

      // Check for possible duplicates by email or phone
      const duplicateCount = await AdmissionInquiry.countDocuments({
        $or: [{ email: data.email.toLowerCase() }, { phone: data.phone }],
      });
      const isPossibleDuplicate = duplicateCount > 0;

      // Generate sequential human-friendly inquiry number: NMC-2026-XXXXXX
      const year = new Date().getFullYear();
      const count = await AdmissionInquiry.countDocuments();
      const seq = (count + 1).toString().padStart(6, '0');
      const inquiryNumber = `NMC-${year}-${seq}`;

      const inquiry = await AdmissionInquiry.create({
        inquiryNumber,
        applicantName: data.applicantName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        address: data.address,
        programId: data.programId,
        qualification: data.qualification,
        message: data.message,
        source: data.source || 'WEBSITE',
        isPossibleDuplicate,
      });

      res.status(201).json({
        success: true,
        message: 'Your admission inquiry has been submitted successfully.',
        data: {
          inquiryNumber: inquiry.inquiryNumber,
          applicantName: inquiry.applicantName,
          createdAt: inquiry.createdAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Admin list & filter admission inquiries
   */
  static async listAdminInquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '10', 10);
      const skip = (page - 1) * limit;

      const query: any = {};
      if (req.query.status) query.status = req.query.status;
      if (req.query.assignedTo) query.assignedTo = req.query.assignedTo;
      if (req.query.duplicatesOnly === 'true') query.isPossibleDuplicate = true;

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search as string, 'i');
        query.$or = [
          { applicantName: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
          { inquiryNumber: searchRegex },
        ];
      }

      const total = await AdmissionInquiry.countDocuments(query);
      const items = await AdmissionInquiry.find(query)
        .populate('programId', 'title slug level')
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
   * Get single admission inquiry by ID
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const inquiry = await AdmissionInquiry.findById(req.params.id)
        .populate('programId')
        .populate('assignedTo', 'name email role')
        .populate('notes.addedBy', 'name email');

      if (!inquiry) throw new NotFoundError('Admission inquiry record not found');

      res.json({ success: true, data: inquiry });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Admin update status, assignment, follow-up, and add note
   */
  static async updateStatusAndNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const data = admissionStatusUpdateSchema.parse(req.body);
      const inquiry = await AdmissionInquiry.findById(req.params.id);
      if (!inquiry) throw new NotFoundError('Admission inquiry record not found');

      inquiry.status = data.status as any;
      if (data.assignedTo !== undefined) inquiry.assignedTo = data.assignedTo || undefined;
      if (data.followUpAt !== undefined) {
        inquiry.followUpAt = data.followUpAt ? new Date(data.followUpAt) : undefined;
      }

      if (data.note && data.note.trim()) {
        inquiry.notes.push({
          note: data.note.trim(),
          addedBy: req.user!.userId as any,
          createdAt: new Date(),
        });
      }

      await inquiry.save();

      const updated = await AdmissionInquiry.findById(inquiry._id)
        .populate('programId')
        .populate('assignedTo', 'name email role')
        .populate('notes.addedBy', 'name email');

      res.json({
        success: true,
        message: 'Admission inquiry record updated successfully',
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }
}

import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage, ContactStatus, IInquiryNote } from '@nobel/types';

export interface IContactMessageDocument extends Omit<IContactMessage, '_id'>, Document {}

const noteSchema = new Schema<IInquiryNote>(
  {
    note: { type: String, required: true, trim: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const contactMessageSchema = new Schema<IContactMessageDocument>(
  {
    referenceNumber: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ContactStatus),
      default: ContactStatus.UNREAD,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

contactMessageSchema.index({ referenceNumber: 1 }, { unique: true });
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage = mongoose.model<IContactMessageDocument>(
  'ContactMessage',
  contactMessageSchema
);

import mongoose, { Schema, Document } from 'mongoose';
import { INotice, ContentStatus } from '@nobel/types';

export interface INoticeDocument extends Omit<INotice, '_id'>, Document {}

const noticeSchema = new Schema<INoticeDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: 'Academic' },
    attachmentUrl: { type: String },
    isImportant: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
  },
  {
    timestamps: true,
  }
);

noticeSchema.index({ slug: 1 }, { unique: true });
noticeSchema.index({ status: 1 });
noticeSchema.index({ isImportant: 1 });
noticeSchema.index({ publishedAt: -1 });

export const Notice = mongoose.model<INoticeDocument>('Notice', noticeSchema);

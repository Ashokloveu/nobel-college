import mongoose, { Schema, Document } from 'mongoose';
import { IDownload, ContentStatus } from '@nobel/types';

export interface IDownloadDocument extends Omit<IDownload, '_id'>, Document {}

const downloadSchema = new Schema<IDownloadDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    category: { type: String, required: true, default: 'General' },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
    downloadCount: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
  },
  {
    timestamps: true,
  }
);

downloadSchema.index({ slug: 1 }, { unique: true });
downloadSchema.index({ status: 1 });
downloadSchema.index({ category: 1 });

export const Download = mongoose.model<IDownloadDocument>('Download', downloadSchema);

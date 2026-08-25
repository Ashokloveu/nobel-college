import mongoose, { Schema, Document } from 'mongoose';
import { IMedia } from '@nobel/types';

export interface IMediaDocument extends Omit<IMedia, '_id'>, Document {}

const mediaSchema = new Schema<IMediaDocument>(
  {
    filename: { type: String, required: true },
    storageKey: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    altText: { type: String },
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, default: 'general' },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ uploaderId: 1 });
mediaSchema.index({ createdAt: -1 });

export const Media = mongoose.model<IMediaDocument>('Media', mediaSchema);

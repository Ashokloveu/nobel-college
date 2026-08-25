import mongoose, { Schema, Document } from 'mongoose';
import { INews, ContentStatus } from '@nobel/types';

export interface INewsDocument extends Omit<INews, '_id'>, Document {}

const newsSchema = new Schema<INewsDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    category: { type: String, required: true, default: 'General' },
    tags: [{ type: String }],
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ slug: 1 }, { unique: true });
newsSchema.index({ status: 1 });
newsSchema.index({ publishedAt: -1 });
newsSchema.index({ featured: 1 });

export const News = mongoose.model<INewsDocument>('News', newsSchema);

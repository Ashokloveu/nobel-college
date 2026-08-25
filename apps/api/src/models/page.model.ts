import mongoose, { Schema, Document } from 'mongoose';
import { ContentStatus } from '@nobel/types';

export interface IPageDocument extends Document {
  title: string;
  slug: string;
  content: string;
  template?: string;
  status: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<IPageDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    template: { type: String, default: 'DEFAULT' },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

pageSchema.index({ slug: 1 }, { unique: true });
pageSchema.index({ status: 1 });

export const Page = mongoose.model<IPageDocument>('Page', pageSchema);

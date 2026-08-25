import mongoose, { Schema, Document } from 'mongoose';
import { IGalleryAlbum, IGalleryImage, ContentStatus } from '@nobel/types';

export interface IGalleryAlbumDocument extends Omit<IGalleryAlbum, '_id'>, Document {}
export interface IGalleryImageDocument extends Omit<IGalleryImage, '_id'>, Document {}

const galleryAlbumSchema = new Schema<IGalleryAlbumDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    coverImageUrl: { type: String },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

galleryAlbumSchema.index({ slug: 1 }, { unique: true });
galleryAlbumSchema.index({ order: 1 });

const galleryImageSchema = new Schema<IGalleryImageDocument>(
  {
    albumId: { type: Schema.Types.ObjectId, ref: 'GalleryAlbum', required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String },
    order: { type: Number, default: 0 },
    fileSize: { type: Number },
    mimeType: { type: String },
  },
  {
    timestamps: true,
  }
);

galleryImageSchema.index({ albumId: 1 });
galleryImageSchema.index({ order: 1 });

export const GalleryAlbum = mongoose.model<IGalleryAlbumDocument>('GalleryAlbum', galleryAlbumSchema);
export const GalleryImage = mongoose.model<IGalleryImageDocument>('GalleryImage', galleryImageSchema);

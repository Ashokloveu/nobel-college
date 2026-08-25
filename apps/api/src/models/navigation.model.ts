import mongoose, { Schema, Document } from 'mongoose';
import { INavigation } from '@nobel/types';

export interface INavigationDocument extends Omit<INavigation, '_id'>, Document {}

const navigationSchema = new Schema<INavigationDocument>(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    type: { type: String, enum: ['HEADER', 'FOOTER', 'QUICK_LINK'], default: 'HEADER' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Navigation' },
    order: { type: Number, default: 0 },
    target: { type: String, enum: ['_self', '_blank'], default: '_self' },
    isVisible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

navigationSchema.index({ order: 1 });
navigationSchema.index({ type: 1 });

export const Navigation = mongoose.model<INavigationDocument>('Navigation', navigationSchema);

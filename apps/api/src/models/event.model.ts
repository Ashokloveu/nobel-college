import mongoose, { Schema, Document } from 'mongoose';
import { IEvent, ContentStatus } from '@nobel/types';

export interface IEventDocument extends Omit<IEvent, '_id'>, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    location: { type: String, required: true, default: 'College Campus Auditorium' },
    coverImageUrl: { type: String },
    organizer: { type: String, required: true, default: 'Nobel Multiple College' },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.PUBLISHED },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ status: 1 });
eventSchema.index({ startDate: 1 });

export const Event = mongoose.model<IEventDocument>('Event', eventSchema);

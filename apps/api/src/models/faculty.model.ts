import mongoose, { Schema, Document } from 'mongoose';
import { IFaculty } from '@nobel/types';

export interface IFacultyDocument extends Omit<IFaculty, '_id'>, Document {}

const facultySchema = new Schema<IFacultyDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    designation: { type: String, required: true, trim: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String },
    qualification: { type: String, required: true },
    biography: { type: String },
    photoUrl: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  {
    timestamps: true,
  }
);

facultySchema.index({ slug: 1 }, { unique: true });
facultySchema.index({ departmentId: 1 });
facultySchema.index({ order: 1 });
facultySchema.index({ status: 1 });

export const Faculty = mongoose.model<IFacultyDocument>('Faculty', facultySchema);

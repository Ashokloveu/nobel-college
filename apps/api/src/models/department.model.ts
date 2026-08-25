import mongoose, { Schema, Document } from 'mongoose';
import { IDepartment } from '@nobel/types';

export interface IDepartmentDocument extends Omit<IDepartment, '_id'>, Document {}

const departmentSchema = new Schema<IDepartmentDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    description: { type: String, required: true },
    headOfDepartment: { type: String },
    email: { type: String },
    phone: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  {
    timestamps: true,
  }
);

departmentSchema.index({ slug: 1 }, { unique: true });
departmentSchema.index({ status: 1 });

export const Department = mongoose.model<IDepartmentDocument>('Department', departmentSchema);

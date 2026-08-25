import mongoose, { Schema, Document } from 'mongoose';
import { IProgram, ProgramLevel } from '@nobel/types';

export interface IProgramDocument extends Omit<IProgram, '_id'>, Document {}

const programSchema = new Schema<IProgramDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    level: {
      type: String,
      enum: Object.values(ProgramLevel),
      required: true,
    },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    curriculum: { type: String },
    careerOpportunities: { type: String },
    feeStructure: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['PUBLISHED', 'DRAFT'], default: 'PUBLISHED' },
  },
  {
    timestamps: true,
  }
);

programSchema.index({ slug: 1 }, { unique: true });
programSchema.index({ status: 1 });
programSchema.index({ departmentId: 1 });
programSchema.index({ featured: 1 });

export const Program = mongoose.model<IProgramDocument>('Program', programSchema);

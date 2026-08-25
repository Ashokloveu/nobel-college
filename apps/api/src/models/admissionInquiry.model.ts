import mongoose, { Schema, Document } from 'mongoose';
import { IAdmissionInquiry, AdmissionStatus, IInquiryNote } from '@nobel/types';

export interface IAdmissionInquiryDocument extends Omit<IAdmissionInquiry, '_id'>, Document {}

const noteSchema = new Schema<IInquiryNote>(
  {
    note: { type: String, required: true, trim: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const admissionInquirySchema = new Schema<IAdmissionInquiryDocument>(
  {
    inquiryNumber: { type: String, required: true, unique: true, uppercase: true },
    applicantName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    qualification: { type: String, required: true, trim: true },
    message: { type: String },
    source: { type: String, default: 'WEBSITE' },
    status: {
      type: String,
      enum: Object.values(AdmissionStatus),
      default: AdmissionStatus.NEW,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    isPossibleDuplicate: { type: Boolean, default: false },
    duplicateOf: { type: Schema.Types.ObjectId, ref: 'AdmissionInquiry' },
    notes: [noteSchema],
    followUpAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

admissionInquirySchema.index({ inquiryNumber: 1 }, { unique: true });
admissionInquirySchema.index({ status: 1 });
admissionInquirySchema.index({ email: 1 });
admissionInquirySchema.index({ phone: 1 });
admissionInquirySchema.index({ assignedTo: 1 });
admissionInquirySchema.index({ followUpAt: 1 });
admissionInquirySchema.index({ createdAt: -1 });

export const AdmissionInquiry = mongoose.model<IAdmissionInquiryDocument>(
  'AdmissionInquiry',
  admissionInquirySchema
);

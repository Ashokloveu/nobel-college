import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserRole, UserStatus } from '@nobel/types';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  passwordHash: string;
  refreshTokenHash?: string;
  twoFactorSecret?: string;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EDITOR,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
      required: true,
    },
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    refreshTokenHash: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
    lastLoginAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ status: 1 });
userSchema.index({ role: 1 });

export const User = mongoose.model<IUserDocument>('User', userSchema);

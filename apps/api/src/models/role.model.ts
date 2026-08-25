import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, PermissionCode } from '@nobel/types';

export interface IRoleDocument extends Document {
  name: UserRole;
  description: string;
  permissions: PermissionCode[];
  isSystem: boolean;
}

const roleSchema = new Schema<IRoleDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    permissions: [{ type: String, required: true }],
    isSystem: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

roleSchema.index({ name: 1 }, { unique: true });

export const Role = mongoose.model<IRoleDocument>('Role', roleSchema);

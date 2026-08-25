import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsDocument extends Document {
  key: string;
  value: any;
  group?: string;
}

const settingsSchema = new Schema<ISettingsDocument>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, default: 'general' },
  },
  {
    timestamps: true,
  }
);

settingsSchema.index({ key: 1 }, { unique: true });

export const Settings = mongoose.model<ISettingsDocument>('Settings', settingsSchema);

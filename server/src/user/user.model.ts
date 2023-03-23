import mongoose, { Schema } from "mongoose";

export interface UserDocumentI extends mongoose.Document {
  name: string;
  email: string;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocumentI>("User", UserSchema);

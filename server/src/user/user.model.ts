import mongoose, { Schema } from "mongoose";

export interface UserDocumentI extends mongoose.Document {
  username: string;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocumentI>("User", UserSchema);

import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true, unique: false },
        email: { type: String, required: true, unique: true, dropDups: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model("User", UserSchema);

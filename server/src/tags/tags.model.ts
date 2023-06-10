import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

export const TagsModel = mongoose.model("Tags", TagsSchema);

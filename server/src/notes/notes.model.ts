import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        markdown: { type: String, required: false },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    },
    {
        timestamps: true,
    }
);

export const NotesModel = mongoose.model("Notes", NotesSchema);

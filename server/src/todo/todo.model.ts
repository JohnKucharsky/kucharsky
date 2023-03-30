import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        todo: { type: String, required: true },
        finished: { type: Boolean, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);

export const TodoModel = mongoose.model("ToDo", TodoSchema);

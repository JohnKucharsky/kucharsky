import { Request, Response } from "express";
import { NotesModel } from "./notes.model";
import { Types } from "mongoose";
import {
    createNotesType,
    deleteNotesType,
    updateNotesType,
} from "./notes.shema";
import { omit } from "lodash";

const notesSelectedFields = {
    title: 1,
    markdown: 1,
    tags: 1,
    updatedAt: 1,
};

export async function getNotesHandler(req: Request, res: Response) {
    try {
        const notes = await NotesModel.find({
            userId: req.user?._id,
        })
            .populate("tags", "label", "Tags")
            .sort([["createdAt", -1]])
            .select(notesSelectedFields)
            .lean();

        if (!notes) {
            res.sendStatus(404);
        }

        res.json(notes);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function getNoteHandler(req: Request, res: Response) {
    try {
        const note = await NotesModel.findOne({
            _id: new Types.ObjectId(req.params.id),
        })
            .populate("tags", "label", "Tags")
            .select(notesSelectedFields)
            .lean();

        if (!note) {
            res.sendStatus(404);
        }

        res.json(note);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function createNoteHandler(
    req: Request<unknown, unknown, createNotesType["body"]>,
    res: Response
) {
    try {
        const note = await NotesModel.create({
            title: req.body.title,
            userId: req.user?._id,
            markdown: req.body.markdown,
            tags: req.body.tags,
        });

        res.send(omit(note.toObject(), ["userId", "createdAt", "__v"]));
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function updateNoteHandler(
    req: Request<updateNotesType["params"], unknown, createNotesType["body"]>,
    res: Response
) {
    try {
        const newNote = await NotesModel.findByIdAndUpdate(
            {
                _id: new Types.ObjectId(req.params.id),
            },
            {
                title: req.body.title,
                markdown: req.body.markdown,
                tags: req.body.tags,
            },
            { new: true, select: notesSelectedFields }
        )
            .populate("tags", "label", "Tags")
            .lean();

        res.send(newNote);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function deleteNoteHandler(
    req: Request<deleteNotesType["params"]>,
    res: Response
) {
    try {
        const result = await NotesModel.deleteOne({
            _id: new Types.ObjectId(req.params.id),
        }).lean();

        res.send(result);
    } catch (e) {
        res.status(400).send(e);
    }
}

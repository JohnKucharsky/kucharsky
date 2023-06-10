import { Request, Response } from "express";
import { TagsModel } from "./tags.model";
import { Types } from "mongoose";
import { createTagsType, deleteTagsType, updateTagsType } from "./tags.shema";
import { omit } from "lodash";

const tagsSelectedFields = {
    label: 1,
    updatedAt: 1,
};

export async function getTagsHandler(req: Request, res: Response) {
    try {
        const notes = await TagsModel.find({
            userId: req.user?._id,
        })
            .sort([["createdAt", -1]])
            .select(tagsSelectedFields)
            .lean();

        if (!notes) {
            res.sendStatus(404);
        }

        res.send(notes);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function createTagHandler(
    req: Request<unknown, unknown, createTagsType["body"]>,
    res: Response
) {
    try {
        const tag = await TagsModel.create({
            label: req.body.label,
            userId: req.user?._id,
        });

        res.send(omit(tag.toObject(), ["userId", "createdAt", "__v"]));
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function updateTagHandler(
    req: Request<updateTagsType["params"], unknown, createTagsType["body"]>,
    res: Response
) {
    try {
        const newTag = await TagsModel.findByIdAndUpdate(
            {
                _id: new Types.ObjectId(req.params.id),
            },
            { label: req.body.label },
            { new: true, select: tagsSelectedFields }
        ).lean();

        res.send(newTag);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function deleteTagHandler(
    req: Request<deleteTagsType["params"]>,
    res: Response
) {
    try {
        const result = await TagsModel.deleteOne({
            _id: new Types.ObjectId(req.params.id),
        }).lean();

        res.send(result);
    } catch (e) {
        res.status(400).send(e);
    }
}

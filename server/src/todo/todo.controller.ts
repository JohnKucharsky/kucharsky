import { Request, Response } from "express";
import { TodoModel } from "./todo.model";
import { Types } from "mongoose";
import { createTodoType, deleteTodoType, updateTodoType } from "./todo.shema";
import { omit } from "lodash";

const todoSelectedFields = {
    todo: 1,
    finished: 1,
    updatedAt: 1,
};

export async function getTodosHandler(req: Request, res: Response) {
    try {
        const todos = await TodoModel.find({
            userId: req.user?._id,
        })
            .sort([["createdAt", -1]])
            .select(todoSelectedFields)
            .lean();

        if (!todos) {
            res.sendStatus(404);
        }

        res.send(todos);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function createTodoHandler(
    req: Request<unknown, unknown, createTodoType["body"]>,
    res: Response
) {
    try {
        const todo = await TodoModel.create({
            todo: req.body.todo,
            userId: req.user?._id,
            finished: req.body.finished,
        });

        res.send(omit(todo.toObject(), ["userId", "createdAt", "__v"]));
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function updateTodoHandler(
    req: Request<updateTodoType["params"], unknown, createTodoType["body"]>,
    res: Response
) {
    try {
        const newTodo = await TodoModel.findByIdAndUpdate(
            {
                _id: new Types.ObjectId(req.params.id),
            },
            { todo: req.body.todo, finished: req.body.finished },
            { new: true, select: todoSelectedFields }
        ).lean();

        res.send(newTodo);
    } catch (e) {
        res.status(400).send(e);
    }
}

export async function deleteTodoHandler(
    req: Request<deleteTodoType["params"]>,
    res: Response
) {
    try {
        const result = await TodoModel.deleteOne({
            _id: new Types.ObjectId(req.params.id),
        }).lean();

        res.send(result);
    } catch (e) {
        res.status(400).send(e);
    }
}

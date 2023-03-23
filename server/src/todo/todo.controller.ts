import { Request, Response } from "express";

export function getTodosHandler(req: Request, res: Response) {
    res.send({ status: "Success" });
}

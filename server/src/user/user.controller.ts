import { getPassword } from "../utils/password";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "./user.model";
import { registerUserType } from "./user.schema";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User {
            name: string;
            email: string;
            hash: string;
            salt: string;
            _id: string;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

export async function registerUserHandler(
    req: Request<unknown, unknown, registerUserType["body"], unknown>,
    res: Response
) {
    const saltHash = getPassword(req.body.password);

    try {
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            hash: saltHash.hash,
            salt: saltHash.salt,
        });

        return res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (e) {
        return res.status(400).send(e);
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    res.send({
        user: req.user
            ? {
                  id: req.user._id,
                  name: req.user.name,
                  email: req.user.email,
              }
            : null,
    });
}

export async function logoutHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send("logout success");
    });
}

export function loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
        req.user
            ? res.send({
                  id: req.user._id,
                  name: req.user.name,
                  email: req.user.email,
              })
            : next();
    } catch (e) {
        res.status(403).send(e);
    }
}

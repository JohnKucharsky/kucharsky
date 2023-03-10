import { getPassword } from "../utils/password";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "./user.model";

export async function registerUserHandler(req: Request, res: Response) {
  const saltHash = getPassword(req.body.password);

  try {
    const user = await UserModel.create({
      username: req.body.username,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });

    return res.status(200).send(user);
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  res.send({ user: req.user ? req.user : null });
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
  res.send("logged successful");
}

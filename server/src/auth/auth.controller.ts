import { getPassword } from "../utils/password";
import { Request, Response } from "express";
import { User } from "../user/user.model";

export async function registerUserHandler(req: Request, res: Response) {
  const saltHash = getPassword(req.body.password);
  try {
    await User.create({
      username: req.body.username,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
}

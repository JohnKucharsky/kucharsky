import { NextFunction, Request, Response } from "express";

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(403)
      .send({ msg: "You are not authenticated to view this resource" });
  }
}

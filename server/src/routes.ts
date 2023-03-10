import { Router, Request, Response } from "express";
import passport from "passport";
import { registerUserHandler } from "./auth/auth.controller";

const router = Router();

router.post("/login", passport.authenticate("local"));
router.post("/register", registerUserHandler);

export default router;

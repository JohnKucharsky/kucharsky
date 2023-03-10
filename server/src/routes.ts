import { Router } from "express";
import passport from "passport";
import {
  getCurrentUserHandler,
  loginHandler,
  logoutHandler,
  registerUserHandler,
} from "./user/user.controller";

const router = Router();

router.post("/login", passport.authenticate("local"), loginHandler);
router.post("/register", registerUserHandler);
router.get("/me", getCurrentUserHandler);
router.post("/logout", logoutHandler);

export default router;

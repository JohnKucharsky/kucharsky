import { Router } from "express";
import passport from "passport";
import {
    getCurrentUserHandler,
    loginHandler,
    logoutHandler,
    registerUserHandler,
} from "./user/user.controller";
import isAuth from "./middleware/isAuth";
import { getTodosHandler } from "./todo/todo.controller";

const router = Router();

router.post("/login", passport.authenticate("local"), loginHandler);
router.post("/register", registerUserHandler);
router.get("/me", getCurrentUserHandler);
router.post("/logout", logoutHandler);
router.get("/todos", isAuth, getTodosHandler);

export default router;

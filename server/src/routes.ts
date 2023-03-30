import { Router } from "express";
import passport from "passport";
import {
    getCurrentUserHandler,
    loginHandler,
    logoutHandler,
    registerUserHandler,
} from "./user/user.controller";
import isAuth from "./middleware/isAuth";
import {
    createTodoHandler,
    deleteTodoHandler,
    getTodosHandler,
    updateTodoHandler,
} from "./todo/todo.controller";
import validate from "./middleware/zodValidation";
import { createUserSchema } from "./user/user.schema";
import {
    createTodoSchema,
    deleteTodoSchema,
    updateTodoSchema,
} from "./todo/todo.shema";

const router = Router();

/*Authentication*/
router.post("/login", passport.authenticate("local"), loginHandler);
router.post("/register", validate(createUserSchema), registerUserHandler);
router.get("/me", getCurrentUserHandler);
router.post("/logout", logoutHandler);
/*Authentication End*/

/*Todos*/
router.get("/todos", isAuth, getTodosHandler);
router.post("/todos", [isAuth, validate(createTodoSchema)], createTodoHandler);
router.post(
    "/todos/:id",
    [isAuth, validate(updateTodoSchema)],
    updateTodoHandler
);
router.delete(
    "/todos/:id",
    [isAuth, validate(deleteTodoSchema)],
    deleteTodoHandler
);
/*Todos End*/

export default router;

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
import {
    createNoteHandler,
    deleteNoteHandler,
    getNoteHandler,
    getNotesHandler,
    updateNoteHandler,
} from "./notes/notes.controller";
import {
    createNotesSchema,
    deleteNotesSchema,
    updateNotesSchema,
} from "./notes/notes.shema";
import {
    createTagHandler,
    deleteTagHandler,
    getTagsHandler,
    updateTagHandler,
} from "./tags/tags.controller";
import {
    createTagsSchema,
    deleteTagsSchema,
    updateTagsSchema,
} from "./tags/tags.shema";

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

/*Notes*/
router.get("/notes", isAuth, getNotesHandler);
router.get("/notes/:id", isAuth, getNoteHandler);
router.post("/notes", [isAuth, validate(createNotesSchema)], createNoteHandler);
router.post(
    "/notes/:id",
    [isAuth, validate(updateNotesSchema)],
    updateNoteHandler
);
router.delete(
    "/notes/:id",
    [isAuth, validate(deleteNotesSchema)],
    deleteNoteHandler
);
/*Notes End*/

/*Tags*/
router.get("/tags", isAuth, getTagsHandler);
router.post("/tags", [isAuth, validate(createTagsSchema)], createTagHandler);
router.post(
    "/tags/:id",
    [isAuth, validate(updateTagsSchema)],
    updateTagHandler
);
router.delete(
    "/tags/:id",
    [isAuth, validate(deleteTagsSchema)],
    deleteTagHandler
);
/*Tags End*/

export default router;

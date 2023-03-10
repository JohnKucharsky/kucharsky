"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("./user/user.controller");
const router = (0, express_1.Router)();
router.post("/login", passport_1.default.authenticate("local"), user_controller_1.loginHandler);
router.post("/register", user_controller_1.registerUserHandler);
router.get("/me", user_controller_1.getCurrentUserHandler);
router.post("/logout", user_controller_1.logoutHandler);
exports.default = router;

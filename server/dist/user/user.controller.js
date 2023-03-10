"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = exports.logoutHandler = exports.getCurrentUserHandler = exports.registerUserHandler = void 0;
const password_1 = require("../utils/password");
const user_model_1 = require("./user.model");
function registerUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltHash = (0, password_1.getPassword)(req.body.password);
        try {
            const user = yield user_model_1.UserModel.create({
                username: req.body.username,
                hash: saltHash.hash,
                salt: saltHash.salt,
            });
            return res.status(200).send(user);
        }
        catch (e) {
            return res.status(400).send(e.errors);
        }
    });
}
exports.registerUserHandler = registerUserHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send({ user: req.user ? req.user : null });
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
function logoutHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.send("logout success");
        });
    });
}
exports.logoutHandler = logoutHandler;
function loginHandler(req, res, next) {
    res.send("logged successful");
}
exports.loginHandler = loginHandler;

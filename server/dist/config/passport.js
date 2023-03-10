"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategy = void 0;
const passport_local_1 = require("passport-local");
const user_model_1 = require("../user/user.model");
const password_1 = require("../utils/password");
const verifyCallback = (username, password, done) => {
    user_model_1.UserModel.findOne({ username: username })
        .then((user) => {
        if (!user) {
            return done(null, false);
        }
        const isValid = (0, password_1.validPassword)(password, user.hash, user.salt);
        if (isValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch((err) => {
        done(err);
    });
};
exports.strategy = new passport_local_1.Strategy(verifyCallback);

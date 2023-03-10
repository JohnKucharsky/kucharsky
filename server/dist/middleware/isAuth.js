"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res
            .status(403)
            .send({ msg: "You are not authenticated to view this resource" });
    }
}
exports.default = isAuth;

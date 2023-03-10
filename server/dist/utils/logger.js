"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, colorize, simple } = winston_1.format;
const log = (0, winston_1.createLogger)({
    format: combine(colorize(), simple()),
    transports: [new winston_1.transports.Console()],
});
exports.default = log;

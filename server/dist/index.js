"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = __importDefault(require("winston"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const logger_1 = __importDefault(require("./utils/logger"));
const passport_1 = __importDefault(require("passport"));
const express_winston_1 = __importDefault(require("express-winston"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const user_model_1 = require("./user/user.model");
const passport_2 = require("./config/passport");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGODB_URI).catch(() => {
    logger_1.default.error("Could not connect to DB");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb+srv://test:test@todocluster.ruogv58.mongodb.net/?retryWrites=true&w=majority",
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
    },
}));
app.use(express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    meta: false,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    colorize: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
passport_1.default.use(passport_2.strategy);
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => {
    user_model_1.UserModel.findById(userId)
        .then((user) => {
        done(null, user);
    })
        .catch((err) => done(err));
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api", routes_1.default);
app.listen(1337, () => {
    logger_1.default.info(`App is running`);
});

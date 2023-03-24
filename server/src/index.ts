import express from "express";
import winston from "winston";
import mongoose from "mongoose";
import session from "express-session";
import logger from "./utils/logger";
import passport from "passport";
import expressWinston from "express-winston";
import path from "path";
import { config } from "dotenv";
import router from "./routes";
import { strategy } from "./utils/passport";
import MongoStore from "connect-mongo";
import { UserModel } from "./user/user.model";
config();

const app = express();

mongoose.connect(process.env.MONGODB_URI as string).catch(() => {
    logger.error("Could not connect to DB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET_KEY as string,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI as string,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 2,
        },
    })
);

app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        meta: false,
        msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
        colorize: true,
    })
);

if (process.env.NODE === "prod") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
    );
}

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(1337, () => {
    logger.info(`App is running`);
});

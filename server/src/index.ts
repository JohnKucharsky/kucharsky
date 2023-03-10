import express from "express";
import winston from "winston";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import logger from "./utils/logger";
import * as crypto from "crypto";
import passport from "passport";
import expressWinston from "express-winston";
import path from "path";
import { config } from "dotenv";
import router from "./routes";
config();

const app = express();

mongoose.connect(process.env.MONGODB_URI || "").catch(() => {
  logger.error("Could not connect to DB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY || "",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
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

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.listen(1337, () => {
  logger.info(`App is running`);
});

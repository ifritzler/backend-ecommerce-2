import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { ejsConfig } from "./common/ejs.config.js";
import routes from "./routes/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";

dotenv.config();

const { COOKIES_SECRET, MONGO_CONNECTURI } = process.env;

const app = express();
app.use(morgan("dev", {}));

const server = http.createServer(app);
ejsConfig(app);

app.use(cors({ origin: ["*"] }));
app.use(express.json());

app.use(
  session({
    secret: COOKIES_SECRET,
    store: MongoStore.create({
      mongoUrl: MONGO_CONNECTURI,
      ttl: 60 * 10,
      stringify: true,
      dbName: "ecommerce",
    }),
    saveUninitialized: false,
    resave: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.get("/helth", (_req, res) => {
  res.status(200).json({
    mongouri: process.env.MONGO_CONNECTIONURI,
    port: process.env.PORT,
  });
});

app.use(errorHandler);

export { app, server };

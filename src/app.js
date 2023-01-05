import cors from "cors";
import express from "express";
import http from "http";
import { ejsConfig } from "./common/ejs.config.js";
import routes from "./routes/index.js";

const { NODE_ENV = "development" } = process.env;
if (NODE_ENV !== "development") {
  import("dotenv/config");
}

const app = express();
const server = http.createServer(app);
ejsConfig(app);

app.use(cors({ origin: ["*"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.get("/helth", (_req, res) => {
  res.sendStatus(200);
});

export { app, server };

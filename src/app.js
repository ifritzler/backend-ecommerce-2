const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const ejsConfig = require("./common/ejs.config");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { mongoUri } = require("./services/mongo.service");
const passportConfig = require("./common/passport");
const passport = require('passport');

dotenv.config();

const { COOKIES_SECRET } = process.env;

const app = express();
app.use(morgan("dev", {}));

const server = http.createServer(app);
ejsConfig(app);

app.use(cors({ origin: ["*"] }));
app.use(express.json());

passportConfig();

app.use(
  session({
    secret: COOKIES_SECRET,
    store: MongoStore.create({
      mongoUrl: mongoUri,
      ttl: 60,
      stringify: true,
    }),
    saveUninitialized: false,
    resave: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    mongouri: mongoUri,
    port: process.env.PORT,
  });
});

app.use(errorHandler);

module.exports = { app, server };

const mongoose = require("mongoose");
const mongoConfig = require("../common/mongoConfig");
const logger = require("../common/logger");

const {
  NODE_ENV,
  MONGO_CONNECT_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_QUERY,
  MONGO_DATABASE_NAME,
} = process.env;

let mongoUri;
if (NODE_ENV === "development") {
  mongoUri = `${MONGO_CONNECT_URI}/${MONGO_DATABASE_NAME}`;
} else if (NODE_ENV === "production") {
  mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE_NAME}${MONGO_QUERY}`;
} else {
  mongoUri = `${MONGO_CONNECT_URI}/testing`;
}

async function connectMongo() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGO_CONNECT_URI, mongoConfig);
    logger.info("Mongo database is connected.");
  } catch (err) {
    logger.error(err.message);
    process.exit(-1);
  }
}

module.exports = {
  connectMongo,
  mongoUri,
};

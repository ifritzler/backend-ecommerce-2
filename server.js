const { server } = require("./src/app");
const logger = require("./src/common/logger");
const { connectMongo } = require("./src/services/mongo.service");

const { PORT = 8080 } = process.env;

connectMongo().then(
  server.listen(PORT, () => {
    logger.info(`Server up and running on port ${PORT}`);
  })
);

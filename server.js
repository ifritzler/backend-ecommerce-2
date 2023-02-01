const { server } = require("./src/app");
const logger = require("./src/common/logger");
const { connectMongo } = require("./src/services/mongo.service");
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    p: 'port'
  },
});

// TODO: Traer de los argumentos de entrada
const PORT = argv?.port || 8080;

connectMongo().then(
  server.listen(PORT, () => {
    logger.info(`Server up and running on port ${PORT}`);
  })
);

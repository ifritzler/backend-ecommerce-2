import { server } from "./src/app.js";
import mongoConfig from "./src/common/mongoConfig.js";
import mongoose from "mongoose";

const { PORT = 8080, MONGO_CONNECTURI } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_CONNECTURI, mongoConfig)
  .then(() => {
    console.log("database is connected 🚀");
    server.listen(PORT, () => {
      console.log("Server listen on port " + PORT);
    });
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(-1);
  });

import { server } from "./src/app.js";

const { PORT = 8080 } = process.env;

server.listen(PORT, () => {
  console.log("Server listen on port " + PORT);
});

const { Router } = require("express");
const clientRoutes = require("./client.routes");
const authRoutes = require("./auth.routes");

const router = Router();

router.use(clientRoutes);

router.use("/api/auth", authRoutes);
module.exports = router;

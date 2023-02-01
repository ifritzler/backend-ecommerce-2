const { Router } = require("express");
const clientRoutes = require("./client.routes");
const authRoutes = require("./auth.routes");
const randomRoutes = require("./random.routes");

const router = Router();

router.use(clientRoutes);

router.use("/api/auth", authRoutes);
router.use("/api/randoms", randomRoutes);
module.exports = router;

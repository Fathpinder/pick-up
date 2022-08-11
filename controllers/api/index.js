const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const eventRoutes = require("./event-routes");
const parkRoutes = require("./park-routes");
// const newEventRoutes = require("./new-event-routes");

router.use("/users", userRoutes);
router.use("/event", eventRoutes);
router.use("/park", parkRoutes);
// router.use("/new-event", newEventRoutes);

module.exports = router;

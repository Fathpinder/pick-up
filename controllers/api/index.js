const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const eventRoutes = require('./event-routes');
//const rsvpRoutes = require('./rsvp-routes');

router.use('/users', userRoutes);
router.use('/event', eventRoutes);
//router.use('/rsvp', rsvpRoutes);

module.exports = router;

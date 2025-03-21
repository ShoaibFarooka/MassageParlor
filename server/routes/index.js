const express = require('express');
const UserRoutes = require('./userRoutes');
const ServiceRoutes = require('./serviceRoutes')
const BookingRoutes = require('./bookingRoutes')

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/service', ServiceRoutes );
router.use('/booking', BookingRoutes );

module.exports = router;
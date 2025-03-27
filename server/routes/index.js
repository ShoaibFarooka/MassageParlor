const express = require('express');
const UserRoutes = require('./userRoutes');
const ServiceRoutes = require('./serviceRoutes')
const BookingRoutes = require('./bookingRoutes')

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/service', ServiceRoutes );
router.use('/booking', BookingRoutes );
router.use('/gallery', BookingRoutes );

module.exports = router;
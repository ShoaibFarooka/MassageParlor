const express = require('express');
const UserRoutes = require('./userRoutes');
const ServiceRoutes = require('./serviceRoutes')
const BookingRoutes = require('./bookingRoutes')
const GalleryRoutes = require('./galleryRoutes')
const stripeRoutes = require('./stripeRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/service', ServiceRoutes);
router.use('/booking', BookingRoutes);
router.use('/gallery', GalleryRoutes);
router.use('/stripe', stripeRoutes);
router.use('/subscription', subscriptionRoutes);

module.exports = router;
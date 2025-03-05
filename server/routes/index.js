const express = require('express');
const UserRoutes = require('./userRoutes');
const ServiceRoutes = require('./serviceRoutes')

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/service', ServiceRoutes );

module.exports = router;
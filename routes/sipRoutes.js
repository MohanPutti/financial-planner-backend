const express = require('express');
const router = express.Router();
const sipController = require('../controllers/sipController');

// Route for calculating SIP
router.post('/calculate', sipController.calculateSip);

module.exports = router;

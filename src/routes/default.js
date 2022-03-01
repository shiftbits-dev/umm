const express = require('express');
const router = express.Router();
const axios = require('axios');

/** GET /health-check - Check service health */
router.get('/', (req, res) =>
    res.send('Welcome to Shiftbits APIs. V 0.0.1')
);

module.exports = router;
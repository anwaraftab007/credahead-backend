const express = require('express');
const router = express.Router();
const { sendDemoRequestEmail } = require('../controllers/sendDemoRequestEmail');

router.post('/', sendDemoRequestEmail);

module.exports = router;

const express = require('express');
const executeNowController = require('../controllers/executeNowController')
const router = express.Router();

router.post('', executeNowController.executeServiceCall);

module.exports = router;
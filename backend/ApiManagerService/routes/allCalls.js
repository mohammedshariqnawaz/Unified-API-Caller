const express = require('express');
const getAllSericeCallsController = require('../controllers/getAllSericeCallsController')
const router = express.Router();

router.get('/', getAllSericeCallsController.getAllCalls);

module.exports = router;
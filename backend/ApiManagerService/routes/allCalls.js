const express = require('express');
const getAllServiceCallsController = require('../controllers/getAllServiceCallsController')
const router = express.Router();

router.get('', getAllServiceCallsController.getAllCalls);

module.exports = router;
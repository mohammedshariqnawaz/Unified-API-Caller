const express = require('express');
const router = express.Router();
const getAllServiceCallsController = require('../controllers/getAllServiceCallsController')

router.get('', getAllServiceCallsController.getAllCalls);

module.exports = router;
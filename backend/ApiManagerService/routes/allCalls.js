const express = require('express');
const router = express.Router();
const getAllServiceCallsController = require('../controllers/getAllServiceCallsController')

/**
 * Get all Service calls
 * @memberof calls
 * @function
 * @name 
 */
router.get('', getAllServiceCallsController.getAllCalls);

module.exports = router;
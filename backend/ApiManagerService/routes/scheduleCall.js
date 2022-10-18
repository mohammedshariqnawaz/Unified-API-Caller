const express = require('express');
const router = express.Router();
const executeController = require('../controllers/executeController')

/**
 * Execute Now Route
 * @memberof schedule
 * @function
 * @name now
 */
router.post('/now', executeController.executeServiceCall);

/**
 * Execute Later Route
 * @memberof schedule
 * @function
 * @name now
 */
router.post('/later',executeController.scheduleServiceCall);

module.exports = router;
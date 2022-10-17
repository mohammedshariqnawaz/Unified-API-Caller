const express = require('express');
const router = express.Router();
const executeController = require('../controllers/executeController')

router.post('/now', executeController.executeServiceCall);
router.post('/later',executeController.scheduleServiceCall);

module.exports = router;
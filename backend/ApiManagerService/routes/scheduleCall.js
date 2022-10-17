const express = require('express');
const router = express.Router();
const executeNowController = require('../controllers/executeNowController')
const executeLaterController = require('../controllers/executeLaterController')

router.post('/now', executeNowController.executeServiceCall);
router.post('/later',executeLaterController.scheduleServiceCall);
module.exports = router;
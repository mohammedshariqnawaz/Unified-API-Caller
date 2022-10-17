const express = require('express');
const executeLaterController = require('../controllers/executeLaterController')
const router = express.Router();

router.post('', executeLaterController.scheduleServiceCall);

module.exports = router;
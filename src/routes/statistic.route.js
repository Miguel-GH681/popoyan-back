const express = require('express');
const router = express.Router();
const statisticController = require('../controllers/statistic.controller');

router.get('/', statisticController.getStatistics);

module.exports = router;

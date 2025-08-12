const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant.controller');

router.get('/', plantController.getPlant);
router.get('/plants', plantController.getPlants);
router.get('/families', plantController.getFamilies);
router.post('/', plantController.postIdentification);

module.exports = router;

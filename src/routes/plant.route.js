const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant.controller');

router.get('/', plantController.getPlant);
router.get('/plants', plantController.getPlants);


module.exports = router;

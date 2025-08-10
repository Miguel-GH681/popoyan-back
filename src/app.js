const express = require('express');
const cors = require('cors');
const plantRoute = require('./routes/plant.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/plants', plantRoute);

module.exports = app;
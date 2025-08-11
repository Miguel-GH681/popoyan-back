const express = require('express');
const cors = require('cors');
const plantRoute = require('./routes/plant.route');
const chatRoute = require('./routes/chat.route');
const statisticRoute = require('./routes/statistic.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/plants', plantRoute);
app.use('/api/chats', chatRoute);
app.use('/api/statistics', statisticRoute);

module.exports = app;
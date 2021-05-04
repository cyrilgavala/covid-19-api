const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const seriesRoutes = require('./route/seriesRoutes');
const statsRoutes = require('./route/statsRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use('/series', seriesRoutes)
app.use('/stats', statsRoutes)

module.exports = app
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const seriesRoutes = require('./routes/seriesRoutes');
const statsRoutes = require('./routes/statsRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use('/series', seriesRoutes)
app.use('/stats', statsRoutes)

module.exports = app
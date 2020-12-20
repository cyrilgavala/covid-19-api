const express = require('express')
const app = express();
const cors = require('cors');
const seriesRoutes = require('./routes/seriesRoutes');
const statsRoutes = require('./routes/statsRoutes');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
    app.use(cors())
    app.use('/series', seriesRoutes)
    app.use('/stats', statsRoutes)
    app.listen(port, () => {
        console.log("API is ready on port:", port)
    })
}).catch(err => console.error('MongoDB connection error:', err));
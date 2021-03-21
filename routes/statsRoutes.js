const express = require('express');
const router = express.Router();
const DailyData = require('../models/dailyData')

router.get('/day', async (req, res) => {
    console.log("%s INFO Recieved get daily data request for %s", new Date().toISOString(), req.query.date);
    if (req.query.date === null || req.query.date === undefined) {
        console.error("Missing parameter 'date'");
        res.status(400).send({error: "Missing parameter 'date'"});
    } else {
        DailyData.find({"date": new Date(req.query.date)}, '-_id',{}, (err, data) => {
            if (err) res.status(500).send(err);
            else res.send(data[0]);
        })
    }
})

module.exports = router
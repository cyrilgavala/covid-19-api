const express = require('express');
const router = express.Router();
const DailyData = require('../models/dailyData')

router.get('/data', async (req, res) => {
    console.log('%s INFO Recieved request for Data series', new Date().toISOString())
    const data = await DailyData.find({}, 'confirmed recovered active date -_id');
    res.send(data);
})

router.get('/deaths', async (req, res) => {
    console.log('%s INFO Recieved request for Deaths series', new Date().toISOString())
    const data = await DailyData.find({}, 'deaths date -_id');
    res.send(data);
})

router.get('/positivePercentage', async (req, res) => {
    console.log('%s INFO Recieved request for Positive percentage series', new Date().toISOString())
    let result = []
    const data = await DailyData.find({}, 'numberOfTests confirmed date -_id');
    for (let i = 0; i < data.length - 1; i++) {
        let current = data[i + 1]
        let previous = data[i]
        result.push({
            "percentage": ((current.confirmed - previous.confirmed) / (current.numberOfTests - previous.numberOfTests) * 100).toFixed(2),
            "date": current.date
        })
    }
    res.send(result);
})

module.exports = router;
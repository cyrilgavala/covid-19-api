const express = require('express');
const router = express.Router();
const DailyData = require('../models/dailyData')

router.get('/data', async (req, res) => {
    console.log('%s INFO Recieved request for Data series', new Date().toISOString())
    DailyData.find({}, 'confirmed recovered active date -_id', (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
})

router.get('/deaths', async (req, res) => {
    console.log('%s INFO Recieved request for Deaths series', new Date().toISOString())
    DailyData.find({}, 'deaths date -_id', (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
})

router.get('/positivePercentage', async (req, res) => {
    console.log('%s INFO Recieved request for Positive percentage series', new Date().toISOString())
    DailyData.find({}, 'numberOfTests confirmed date -_id', (err, data) => {
        if (err) res.status(500).send(err);
        else {
            let result = []
            for (let i = 0; i < data.length - 1; i++) {
                let current = data[i + 1]
                let previous = data[i]
                result.push({
                    "percentage": ((current.confirmed - previous.confirmed) / (current.numberOfTests - previous.numberOfTests) * 100).toFixed(2),
                    "date": current.date
                })
            }
            res.send(result);
        }
    });

})

module.exports = router;
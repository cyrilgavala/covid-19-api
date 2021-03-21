const express = require('express');
const router = express.Router();
const DailyData = require('../models/dailyData')

/** @namespace req.query.startDate **/
/** @namespace req.query.endDate **/
//eslint-disable-express-serve-static-core

function evaluateDates(startDate, endDate) {
    if (startDate === null || startDate === undefined) {
        console.error("%s ERROR Missing parameter 'startDate'", new Date().toISOString());
        return "Missing parameter 'startDate'";
    } else if (endDate === null || endDate === undefined) {
        console.error("%s ERROR Missing parameter 'endDate'", new Date().toISOString());
        return "Missing parameter 'endDate'";
    } else if (new Date(startDate) >= new Date(endDate)) {
        console.error("%s ERROR Invalid date range", new Date().toISOString())
        return "Invalid date range. End date must be greater than start date";
    } else {
        return ""
    }
}

router.get('/deaths', async (req, res) => {
    console.log('%s INFO Recieved request for deaths series from %s to %s',
        new Date().toISOString(), req.query.startDate, req.query.endDate)
    const errorMsg = evaluateDates(req.query.startDate, req.query.endDate)
    if (errorMsg !== "") {
        res.status(400).send({error: errorMsg});
    } else {
        DailyData.find({"date": {$gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate)}},
            'deaths date -_id', (err, data) => {
            if (err) res.status(500).send(err);
            else res.send(data);
        })
    }
})

router.get('/positivePercentage', async (req, res) => {
    console.log('%s INFO Recieved request for positive percentage series from %s to %s',
        new Date().toISOString(), req.query.startDate, req.query.endDate)
    const errorMsg = evaluateDates(req.query.startDate, req.query.endDate)
    if (errorMsg !== "") {
        res.status(400).send({error: errorMsg});
    } else {
        DailyData.find({"date": {$gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate)}},
            'numberOfTests confirmed date -_id', (err, data) => {
            if (err) res.status(500).send(err);
            else {
                let result = []
                for (let i = 0; i < data.length - 1; i++) {
                    let current = data[i + 1]
                    let previous = data[i]
                    let percentage = (current.numberOfTests - previous.numberOfTests) > 0 ?
                        ((current.confirmed - previous.confirmed) / (current.numberOfTests - previous.numberOfTests) * 100).toFixed(2) : 0;
                    result.push({
                        "percentage": percentage,
                        "date": current.date
                    })
                }
                res.send(result);
            }
        });
    }
})

router.get('/testsDaily', async (req, res) => {
    console.log('%s INFO Recieved request for daily tests series from %s to %s',
        new Date().toISOString(), req.query.startDate, req.query.endDate)
    const errorMsg = evaluateDates(req.query.startDate, req.query.endDate)
    if (errorMsg !== "") {
        res.status(400).send({error: errorMsg});
    } else {
        DailyData.find({"date": {$gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate)}},
            'numberOfTests confirmed date -_id', (err, data) => {
            if (err) res.status(500).send(err);
            else {
                let result = []
                for (let i = 0; i < data.length - 1; i++) {
                    let current = data[i + 1]
                    let previous = data[i]
                    result.push({
                        "tests": current.numberOfTests - previous.numberOfTests,
                        "confirmed": current.confirmed - previous.confirmed,
                        "date": current.date
                    })
                }
                res.send(result);
            }
        });
    }
})

router.get('/deathsDaily', async (req, res) => {
    console.log('%s INFO Recieved request for daily deaths series from %s to %s',
        new Date().toISOString(), req.query.startDate, req.query.endDate)
    const errorMsg = evaluateDates(req.query.startDate, req.query.endDate)
    if (errorMsg !== "") {
        res.status(400).send({error: errorMsg});
    } else {
        DailyData.find({"date": {$gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate)}},
            'deaths date -_id', (err, data) => {
            if (err) res.status(500).send(err);
            else {
                let result = []
                for (let i = 0; i < data.length - 1; i++) {
                    let current = data[i + 1]
                    let previous = data[i]
                    result.push({
                        "deaths": current.deaths - previous.deaths,
                        "date": current.date
                    })
                }
                res.send(result);
            }
        });
    }
})

module.exports = router;
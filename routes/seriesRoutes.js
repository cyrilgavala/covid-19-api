const express = require('express');
const router = express.Router();
const DailyData = require('../models/dailyData')

/** @namespace req.query.startDate **/

function buildQueryFilter(startDate) {
	if (startDate !== null && startDate !== undefined) {
		return {"date": {$gte: startDate}};
	} else {
		return {}
	}
}

router.get('/deaths', async (req, res) => {
	console.log('%s INFO Received request for deaths series from %s', new Date().toISOString(), req.query.startDate)
	DailyData.find(buildQueryFilter(req.query.startDate), 'deaths date -_id', (err, data) => {
		if (err) res.status(500).send(err);
		else res.send(data);
	})
})

router.get('/positivePercentage', async (req, res) => {
	console.log('%s INFO Received request for positive percentage series from %s', new Date().toISOString(), req.query.startDate)
	DailyData.find(buildQueryFilter(req.query.startDate), 'numberOfTests confirmed date -_id', (err, data) => {
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
})

router.get('/testsDaily', async (req, res) => {
	console.log('%s INFO Received request for daily tests series from %s', new Date().toISOString(), req.query.startDate)
	DailyData.find(buildQueryFilter(req.query.startDate), 'numberOfTests confirmed date -_id', (err, data) => {
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
})

router.get('/deathsDaily', async (req, res) => {
	console.log('%s INFO Received request for daily deaths series from %s', new Date().toISOString(), req.query.startDate)
	DailyData.find(buildQueryFilter(req.query.startDate), 'deaths date -_id', (err, data) => {
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
})

module.exports = router;
const express = require('express');
const router = express.Router();
const dailyDataService = require('../service/dailyDataService')

/** @namespace req.query.startDate **/
/** @namespace req.query.endDate **/

router.get('/deaths', async (req, res) => {
	console.log('%s INFO Received request for deaths series with params %s', new Date().toISOString(), req.query)
	try {
		dailyDataService.getDeathsSeries(req.query.startDate, req.query.endDate).then(data => res.status(200).send(data))
	} catch (err) {
		console.error(err)
		res.status(500).send({"error": err})
	}
});

router.get('/positivePercentage', async (req, res) => {
	console.log('%s INFO Received request for positive percentage series with params %s', new Date().toISOString(), req.query)
	try {
		dailyDataService.getPositivePercentageSeries(req.query.startDate, req.query.endDate).then(data => res.status(200).send(data));
	} catch (err) {
		console.error(err)
		res.status(500).send({"error": err})
	}
});

router.get('/testsDaily', async (req, res) => {
	console.log('%s INFO Received request for daily test series with params %s', new Date().toISOString(), req.query)
	try {
		dailyDataService.getDailyTestsSeries(req.query.startDate, req.query.endDate).then(data => res.status(200).send(data))
	} catch (err) {
		console.error(err)
		res.status(500).send({"error": err})
	}
})

router.get('/deathsDaily', async (req, res) => {
	console.log('%s INFO Received request for daily deaths series with params %s', new Date().toISOString(), req.query)
	try {
		dailyDataService.getDailyDeathsSeries(req.query.startDate, req.query.endDate).then(data => res.status(200).send(data))
	} catch (err) {
		console.error(err)
		res.status(500).send({"error": err})
	}
});

module.exports = router;
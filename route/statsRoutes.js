const express = require('express');
const router = express.Router();
const dailyDataService = require('../service/dailyDataService')

router.get('/day', async (req, res) => {
	console.log("%s INFO Received get daily data request with params %s", new Date().toISOString(), req.query);
	if (req.query.date === null || req.query.date === undefined || req.query.date.length === 0) {
		console.error("Missing parameter 'date'");
		res.status(400).send({error: "Missing parameter 'date'"});
	} else {
		try {
			dailyDataService.getDailyDataByDay(new Date(req.query.date)).then(data => {
				res.status(200).send(data[0])
			})
		} catch (err) {
			console.error(err)
			res.status(500).send({"error": err.message})
		}
	}
})

module.exports = router
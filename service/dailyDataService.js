const dailyDataDao = require('../dao/dailyDataDao');

function getDailyDataByDay(date) {
	return dailyDataDao.getDailyDataByDay(date);
}

function getDeathsSeries(startDate, endDate) {
	return dailyDataDao.getSelectedDailyDataSeries(startDate, endDate, 'deaths date -_id');
}

function getPositivePercentageSeries(startDate, endDate) {
	return dailyDataDao.getSelectedDailyDataSeries(startDate, endDate, 'numberOfTests confirmed date -_id').then(data => {
		let resultToReturn = []
		for (let i = 0; i < data.length - 1; i++) {
			let current = data[i + 1]
			let previous = data[i]
			let percentage = (current.numberOfTests - previous.numberOfTests) > 0 ?
					((current.confirmed - previous.confirmed) / (current.numberOfTests - previous.numberOfTests) * 100).toFixed(2) : 0;
			resultToReturn.push({
				"percentage": percentage,
				"date": current.date
			})
		}
		return resultToReturn;
	})
}

function getDailyDeathsSeries(startDate, endDate) {
	return dailyDataDao.getSelectedDailyDataSeries(startDate, endDate, 'deaths date -_id').then(data => {
		let resultToReturn = []
		for (let i = 0; i < data.length - 1; i++) {
			let current = data[i + 1]
			let previous = data[i]
			resultToReturn.push({
				"deaths": current.deaths - previous.deaths,
				"date": current.date
			})
		}
		return resultToReturn;
	})
}

function getDailyTestsSeries(startDate, endDate) {
	return dailyDataDao.getSelectedDailyDataSeries(startDate, endDate, 'numberOfTests confirmed date -_id').then(data => {
		let resultToReturn = []
		for (let i = 0; i < data.length - 1; i++) {
			let current = data[i + 1]
			let previous = data[i]
			resultToReturn.push({
				"tests": current.numberOfTests - previous.numberOfTests,
				"confirmed": current.confirmed - previous.confirmed,
				"date": current.date
			})
		}
		return resultToReturn;
	})
}

module.exports = {
	getDailyDataByDay,
	getDeathsSeries,
	getPositivePercentageSeries,
	getDailyDeathsSeries,
	getDailyTestsSeries
}
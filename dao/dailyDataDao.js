const DailyData = require('../database/models/dailyData')

function buildQueryFilter(startDate, endDate) {
	if (startDate !== null && startDate !== undefined) {
		return endDate !== null && endDate !== undefined ? {
			"date": {
				$gte: new Date(startDate),
				$lte: new Date(endDate)
			}
		} : {"date": {$gte: new Date(startDate)}};
	} else {
		return endDate !== null && endDate !== undefined ? {"date": {$lte: new Date(endDate)}} : {}
	}
}

function getSelectedDailyDataSeries(startDate, endDate, projections) {
	return DailyData.find(buildQueryFilter(startDate, endDate), projections, {})
}

function getDailyDataByDay(date) {
	return DailyData.find({"date": date}, '-_id', {});
}

module.exports = {getDailyDataByDay, getSelectedDailyDataSeries}
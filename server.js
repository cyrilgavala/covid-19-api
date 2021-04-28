const app = require('./app.js');
const dbConnector = require('./database/databaseConnector');

const PORT = process.env.PORT || 8080

dbConnector.connect().then(() => {
	app.listen(PORT, () => {
		console.log('Listening on port: ' + PORT);
	});
});
require('dotenv').config('../.env')

module.exports = {
	dbUrl: process.env.DB_URL,
	dbProperties: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 50
	}
}
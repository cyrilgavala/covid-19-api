const mongoose = require('mongoose');
const properties = require('../config/properties')
const DB_URL = process.env.DB_URL;

function connect() {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL, properties.dbProperties).then((res, err) => {
			if (err) reject(err);
			console.log('Database connected')
			resolve();
		})
	})
}

function disconnect() {
	return new Promise((resolve, reject) => {
		mongoose.disconnect().then((res, err) => {
			if (err) reject(err)
			console.log('Database disconnected')
			resolve()
		});
	})
}

module.exports = {connect, disconnect};
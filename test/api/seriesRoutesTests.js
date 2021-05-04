const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');
const conn = require('../../database/databaseConnector');

describe('GET /series/deaths', () => {
	before((done) => {
		conn.connect().then(() => done()).catch((err) => done(err));
	})

	after((done) => {
		conn.disconnect().then(() => done()).catch((err) => done(err));
	})

	it('200, getting series no params', (done) => {
		request(app).get('/series/deaths').then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with endDate param', (done) => {
		request(app).get('/series/deaths').query({endDate: '2020-11-25T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(2);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate param', (done) => {
		let startDate = new Date();
		startDate.setDate(startDate.getDate() - 2)
		startDate.setUTCHours(0, 0, 0, 0)
		request(app).get('/series/deaths').query({startDate: startDate.toISOString()}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(3);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param', (done) => {
		request(app).get('/series/deaths').query({
			startDate: '2021-01-01T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(4);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param no intersection', (done) => {
		request(app).get('/series/deaths').query({
			startDate: '2021-01-10T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			expect(res.status).to.equals(200);
			expect(res.body).to.deep.equal([]);
			done();
		}).catch((err) => done(err))
	});

})

describe('GET /series/deathsDaily', () => {
	before((done) => {
		conn.connect().then(() => done()).catch((err) => done(err));
	})

	after((done) => {
		conn.disconnect().then(() => done()).catch((err) => done(err));
	})

	it('200, getting series no params', (done) => {
		request(app).get('/series/deathsDaily').then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with endDate param', (done) => {
		request(app).get('/series/deathsDaily').query({endDate: '2020-11-25T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(1);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate param', (done) => {
		let startDate = new Date();
		startDate.setDate(startDate.getDate() - 2)
		startDate.setUTCHours(0, 0, 0, 0)
		request(app).get('/series/deathsDaily').query({startDate: startDate.toISOString()}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(2);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param', (done) => {
		request(app).get('/series/deathsDaily').query({
			startDate: '2021-01-01T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(3);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('deaths');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param no intersection', (done) => {
		request(app).get('/series/deathsDaily').query({
			startDate: '2021-01-10T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			expect(res.status).to.equals(200);
			expect(res.body).to.deep.equal([]);
			done();
		}).catch((err) => done(err))
	});

})

describe('GET /series/testsDaily', () => {
	before((done) => {
		conn.connect().then(() => done()).catch((err) => done(err));
	})

	after((done) => {
		conn.disconnect().then(() => done()).catch((err) => done(err));
	})

	it('200, getting series no params', (done) => {
		request(app).get('/series/testsDaily').then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('tests');
				expect(element).to.contain.hasOwnProperty('confirmed');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with endDate param', (done) => {
		request(app).get('/series/testsDaily').query({endDate: '2020-11-25T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(1);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('tests');
				expect(element).to.contain.hasOwnProperty('confirmed');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate param', (done) => {
		let startDate = new Date();
		startDate.setDate(startDate.getDate() - 2)
		startDate.setUTCHours(0, 0, 0, 0)
		request(app).get('/series/testsDaily').query({startDate: startDate.toISOString()}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(2);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('tests');
				expect(element).to.contain.hasOwnProperty('confirmed');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param', (done) => {
		request(app).get('/series/testsDaily').query({
			startDate: '2021-01-01T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(3);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('tests');
				expect(element).to.contain.hasOwnProperty('confirmed');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param no intersection', (done) => {
		request(app).get('/series/testsDaily').query({
			startDate: '2021-01-10T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			expect(res.status).to.equals(200);
			expect(res.body).to.deep.equals([])
			done();
		}).catch((err) => done(err))
	});

})

describe('GET /series/positivePercentage', () => {
	before((done) => {
		conn.connect().then(() => done()).catch((err) => done(err));
	})

	after((done) => {
		conn.disconnect().then(() => done()).catch((err) => done(err));
	})

	it('200, getting series no params', (done) => {
		request(app).get('/series/positivePercentage').then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('percentage');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with endDate param', (done) => {
		request(app).get('/series/positivePercentage').query({endDate: '2020-11-25T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(1);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('percentage');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate param', (done) => {
		let startDate = new Date();
		startDate.setDate(startDate.getDate() - 2)
		startDate.setUTCHours(0, 0, 0, 0)
		request(app).get('/series/positivePercentage').query({startDate: startDate.toISOString()}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(2);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('percentage');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param', (done) => {
		request(app).get('/series/positivePercentage').query({
			startDate: '2021-01-01T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body.length).to.equals(3);
			body.forEach((element) => {
				expect(element).to.contain.hasOwnProperty('date');
				expect(element).to.contain.hasOwnProperty('percentage');
			})
			done();
		}).catch((err) => done(err))
	});

	it('200, getting series with startDate and endDate param no intersection', (done) => {
		request(app).get('/series/positivePercentage').query({
			startDate: '2021-01-10T00:00:00.000Z',
			endDate: '2021-01-04T00:00:00.000Z'
		}).then((res) => {
			expect(res.status).to.equals(200);
			expect(res.body).to.deep.equals([])
			done();
		}).catch((err) => done(err))
	});

})

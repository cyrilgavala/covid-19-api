const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');
const conn = require('../../database/databaseConnector');

describe('GET /stats/day', () => {
	before((done) => {
		conn.connect().then(() => done()).catch((err) => done(err));
	})

	after((done) => {
		conn.disconnect().then(() => done()).catch((err) => done(err));
	})

	it('OK, getting data for day not in db', (done) => {
		request(app).get('/stats/day').query({date: '2020-01-01T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body).to.deep.equal({});
			done();
		}).catch((err) => done(err));
	});

	it('OK, getting data for day in db', (done) => {
		request(app).get('/stats/day').query({date: '2021-01-01T00:00:00.000Z'}).then((res) => {
			const body = res.body;
			expect(res.status).to.equals(200);
			expect(body).to.contain.hasOwnProperty('numberOfTests');
			expect(body).to.contain.hasOwnProperty('confirmed');
			expect(body).to.contain.hasOwnProperty('deaths');
			expect(body.date).to.equal('2021-01-01T00:00:00.000Z');
			done();
		}).catch((err) => done(err))
	});

	it('FAIL, getting data with date parameter', (done) => {
		request(app).get('/stats/day').then((res) => {
			const body = res.body;
			expect(res.status).to.equals(400);
			expect(body).to.contain.hasOwnProperty('error');
			expect(body.error).to.equal("Missing parameter 'date'")
			done();
		}).catch((err) => done(err))
	});
})
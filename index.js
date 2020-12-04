const express = require('express')
const app = express();
const url = process.env.DB_URL;
const JSONStream = require('JSONStream');
const MongoClient = require('mongodb').MongoClient;
const clientResolved = Promise.resolve(MongoClient.connect(url, {useUnifiedTopology: true}));
const cors = require('cors');

app.use(cors())

app.get('/day', (req, res) => {
    console.log("Recieved get daily data request for date=", req.query.date);
    if (req.query.date === null || req.query.date === undefined) {
        console.error("Missing parameter 'date'");
        res.send({error: "Missing parameter 'date'"});
    } else {
        clientResolved.then(c => {
            c.db("covid-data").collection("daily-data").findOne({"date": new Date(req.query.date)}, function (err, data) {
                if (err) res.send(err);
                res.json(data);
            })
        }).catch(err => {
            console.error("Error while retrieving data {}", err);
            res.send(err);
        })
    }
});

app.get('/days', (req, res) => {
    console.log("Recieved get daily data request since date=", req.query.date);
    if (req.query.date === null || req.query.date === undefined) {
        console.error("Missing parameter 'date'");
        res.send({error: "Missing parameter 'date'"});
    } else {
        clientResolved.then(c => {
            c.db("covid-data").collection("daily-data").find({"date": {$gte: new Date(req.query.date)}}, {sort: {date: 1}},
                function (err, data) {
                    if (err) res.send(err);
                    res.set('Content-Type', 'application/json');
                    data.stream().pipe(JSONStream.stringify()).pipe(res);
                })
        }).catch(err => {
            console.error("Error while retrieving data {}", err);
            res.send(err);
        })
    }
});

let port = process.env.PORT || 8080
app.listen(port, () => {
    console.log("API is ready on port:", port);
});
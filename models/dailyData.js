const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyDataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    numberOfTests: Number,
    confirmed: Number,
    active: Number,
    recovered: Number,
    deaths: Number,
    date: Date,
}, {
    collection: 'daily-data'
});

module.exports = mongoose.model('Daily data', DailyDataSchema);
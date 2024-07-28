const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSummarySchema = new Schema({
  date: { type: Date, required: true, unique: true },
  avgTemperature: { type: Number, required: true },
  maxTemperature: { type: Number, required: true },
  minTemperature: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
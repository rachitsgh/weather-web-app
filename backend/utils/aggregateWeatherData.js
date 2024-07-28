const WeatherSummary = require('../models/WeatherSummary');
const getWeatherData = require('./getWeatherData');

const aggregateWeatherData = async () => {
  try {
    // Fetch weather data (you can modify the parameters as needed)
    const weatherData = await getWeatherData('weather', { q: 'city_name', units: 'metric' });

    // Assuming weatherData is an array of weather objects
    const dailyData = {};

    weatherData.forEach((data) => {
      const date = new Date(data.timestamp).toISOString().split('T')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          temperatures: [],
          conditions: {},
          maxTemperature: -Infinity,
          minTemperature: Infinity,
        };
      }

      dailyData[date].temperatures.push(data.temperature);
      dailyData[date].maxTemperature = Math.max(dailyData[date].maxTemperature, data.temperature);
      dailyData[date].minTemperature = Math.min(dailyData[date].minTemperature, data.temperature);

      if (dailyData[date].conditions[data.condition]) {
        dailyData[date].conditions[data.condition]++;
      } else {
        dailyData[date].conditions[data.condition] = 1;
      }
    });

    const summaries = Object.keys(dailyData).map((date) => {
      const data = dailyData[date];
      const avgTemperature = data.temperatures.reduce((a, b) => a + b) / data.temperatures.length;

      const dominantCondition = Object.keys(data.conditions).reduce((a, b) =>
        data.conditions[a] > data.conditions[b] ? a : b);

      return {
        date,
        avgTemperature,
        maxTemperature: data.maxTemperature,
        minTemperature: data.minTemperature,
        dominantCondition
      };
    });

    await WeatherSummary.insertMany(summaries);
  } catch (error) {
    console.error('Error aggregating weather data:', error);
  }
};

module.exports = aggregateWeatherData;
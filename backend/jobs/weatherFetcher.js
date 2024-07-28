const aggregateWeatherData = require('../utils/aggregateWeatherData');

const fetchWeatherData = async () => {
  await aggregateWeatherData();
};

// Fetch every 5 minutes
setInterval(fetchWeatherData, 300000);

// Fetch immediately on startup
fetchWeatherData();
// src/weatherUtil.js

// Convert Celsius → Fahrenheit
export const convertToFahrenheit = (celsius) =>
  ((celsius * 9) / 5 + 32).toFixed(1);

// Map WMO weather codes with day/night
export const getWeatherTypeFromCode = (code, isDay = true) => {
  const weatherCodes = {
    0: isDay ? "☀️ Clear sky" : "🌙 Clear night",
    1: isDay ? "🌤️ Mainly clear" : "🌙 Mainly clear night",
    2: isDay ? "⛅ Partly cloudy" : "☁️ Partly cloudy night",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Rime fog",
    51: "🌦️ Light drizzle",
    53: "🌦️ Moderate drizzle",
    55: "🌧️ Dense drizzle",
    61: "🌧️ Slight rain",
    63: "🌧️ Moderate rain",
    65: "🌧️ Heavy rain",
    71: "❄️ Light snow",
    73: "❄️ Moderate snow",
    75: "❄️ Heavy snow",
    80: "🌧️ Rain showers (light)",
    81: "🌧️ Rain showers (moderate)",
    82: "🌧️ Rain showers (violent)",
    95: "⛈️ Thunderstorm",
    96: "⛈️ Thunderstorm with hail",
    99: "⛈️ Severe thunderstorm with hail",
  };

  return weatherCodes[Number(code)] || "🌍 Unknown";
};

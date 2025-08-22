import { useEffect, useState } from "react";
import WeatherRow from "../components/WeatherRow";
import WeatherSummary from "../components/WeatherSummary";
import getWeather from "../Api/WeatherApi";

const fetchCoordinates = (callback) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      callback(latitude, longitude);
    },
    (err) => console.error(err)
  );
};

const Weatherpage = () => {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const isDay = todayWeather.isDay ?? true;

  useEffect(() => {
    fetchCoordinates(async (latitude, longitude) => {
      const weatherInfo = await getWeather({ latitude, longitude });
      console.log("Fetched weather:", weatherInfo);

      convertToStatevariable(weatherInfo);
    });
  }, []);

  const convertToStatevariable = (tempWeekWeather) => {
    // Weekly forecast
    let fetchedWeatherInfo = [];
    for (let i = 0; i < tempWeekWeather.daily.time.length; i++) {
      fetchedWeatherInfo.push({
        date: new Date(tempWeekWeather.daily.time[i]),
        maxTemperature: tempWeekWeather.daily.temperature_2m_max[i],
        minTemperature: tempWeekWeather.daily.temperature_2m_min[i],
        weatherCode: tempWeekWeather.daily.weathercode[i], // forecasted
      });
    }
    setWeekWeather(fetchedWeatherInfo);

    // Today current weather
    let currentWeather = { ...tempWeekWeather.current_weather };
    currentWeather.time = new Date(currentWeather.time);
    currentWeather.isDay = currentWeather.is_day === 1 ? true : false;
    currentWeather.weatherCode = currentWeather.weathercode;
    delete currentWeather.weathercode;
    delete currentWeather.is_day;

    setTodayWeather(currentWeather);
  };

  if (!weekWeather.length) {
    return <p>Loading......</p>;
  }

  return (
    <div className={isDay ? "app" : "app-dark"}>
      <h1 className="my-heading">Weather</h1>

      <button
        className="ui icon button"
        onClick={() => {
          setIsCelsius(!isCelsius);
        }}
        style={{ float: "right" }}
      >
        {isCelsius ? "°F" : "°C"}
      </button>

      {/* ✅ Show Today’s Weather */}
      <WeatherSummary currentWeather={todayWeather} isCelsius={isCelsius} />

      {/* ✅ Weekly forecast */}
      <table className={`ui very basic table ${isDay ? "app" : "app-dark"}`}>
        <thead className={`table-custom ${isDay ? "app" : "app-dark"}`}>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody className="table-custom">
          {weekWeather.map((weather) => (
            <WeatherRow
              weather={weather}
              isCelsius={isCelsius}
              key={weather.date}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Weatherpage;

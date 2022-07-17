import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/Weather/CurrentWeather";
import ForecastWeather from "./components/Weather/ForecastWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [error, setError] = useState(null);

  const handleOnSearchChange = (city) => {
    setCity(city);
  };

  useEffect(() => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?units=metric&lang=en&q=${city}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?units=metric&lang=en&q=${city}&appid=${WEATHER_API_KEY}`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setWeather(weatherResponse);
        setForecast(forecastResponse);
      })
      .catch((e) => setError(e));
  }, [city]);
  
  return (
    <div className="">
      <div className="decorate-bar top"></div>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {error && <div className="text-danger text-center">Failed to fetch</div>}
        {weather && weather.cod != 200 && <div className="text-danger text-center">Weather: {weather.message}</div>}
        {forecast && forecast.cod != 200 && <div className="text-danger text-center">Forecast: {forecast.message}</div>}
        <div className="weather">
          {weather && weather.cod == 200 && <CurrentWeather data={weather} />}
          {forecast && forecast.cod == 200 && <ForecastWeather timezone={weather.timezone} data={forecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;

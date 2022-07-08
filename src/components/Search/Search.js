import SearchResult from "./SearchResult";
import { useState, useEffect } from "react";

const Search = () => {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setCity(e.target.city.value);
  };

  const ConvertM2KM = (distance) => {
    return Math.round((distance / 1000) * 10) / 10 + " km";
  };

  const FormatDateTime = (timestamp, type) => {
    const new_date = new Date(timestamp * 1000);
    const date = new_date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
    const time = new_date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (type == "date") {
      return date;
    } else if (type == "time") {
      return time;
    } else {
      return date + " " + time;
    }
  };

  const FormatTemp = (temp) => {
    return Math.round(temp) + "°C";
  };

  const FormatPressure = (pressure) => {
    return pressure + " hPa";
  };

  const FormatPercentage = (percentage) => {
    return percentage + "%";
  };

  const FormatSpeed = (speed) => {
    return speed + " m/s W";
  };
  const FormatVolume = (volume) => {
    return volume + " mm";
  };

  const APP_ID = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&q=" + city + "&appid=" + APP_ID)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod == 200) {
            result.weather[0].description =
              result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1);
            result.weather[0].icon = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png";
            result.main.temp = FormatTemp(result.main.temp);
            result.main.feels_like = FormatTemp(result.main.feels_like);
            result.main.temp_min = FormatTemp(result.main.temp_min);
            result.main.temp_max = FormatTemp(result.main.temp_max);
            result.dt = FormatDateTime(result.dt, "datetime");
            result.sys.sunrise = FormatDateTime(result.sys.sunrise, "time");
            result.sys.sunset = FormatDateTime(result.sys.sunset, "time");
            result.visibility = ConvertM2KM(result.visibility);
            result.wind.speed = FormatSpeed(result.wind.speed);
            result.main.humidity = FormatPercentage(result.main.humidity);
            if (result.clouds) {
              result.clouds.all = FormatPercentage(result.clouds.all);
            }
            if (result.main.pressure) {
              result.main.pressure = FormatPressure(result.main.pressure);
            } else {
              result.main.sea_level = FormatPressure(result.main.sea_level);
              result.main.grnd_level = FormatPressure(result.main.grnd_level);
            }
            if (result.snow) {
              result.snow.snow["1h"] = FormatVolume(result.snow.snow["1h"]);
              result.snow.snow["3h"] = FormatVolume(result.snow.snow["3h"]);
            }
            if (result.rain) {
              result.rain.rain["1h"] = FormatVolume(result.rain.rain["1h"]);
              result.rain.rain["3h"] = FormatVolume(result.rain.rain["3h"]);
            }
          }
          setWeather(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [city]);

  let searchResult = "";
  if (error) {
    searchResult = <div className="text-danger text-center">Failed to fetch</div>;
  } else if (weather.cod != 200) {
    searchResult = <div className="text-danger text-center">{weather.message}</div>;
  } else {
    searchResult = <SearchResult weather={weather} />;
  }

  return (
    <>
      <nav className="bg-light p-3">
        <form onSubmit={SubmitHandler}>
          <div className="form-group row">
            <label htmlFor="city" className="col-md-2 col-form-label text-center">
              City
            </label>
            <div className="col-md-8">
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                placeholder="Weather in your city(e.g. Toronto)"
              />
            </div>
            <button className="btn btn-primary col-md-2">Search</button>
          </div>
        </form>
      </nav>
      {searchResult}
    </>
  );
};

export default Search;

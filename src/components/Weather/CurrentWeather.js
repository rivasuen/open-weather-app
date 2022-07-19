import "./CurrentWeather.css";
import CurrentWeatherDetailRow from "./CurrentWeatherDetailRow";
import * as Formatter from "../../utils";

const CurrentWeather = (props) => {
  const items = props.data;
  return (
    <div>
      <div className="weather-summary">
        <div className="datetime">{Formatter.FormatDateTime(items.dt, items.timezone, "datetime")}</div>
        <div className="city">
          {items.name}, {items.sys.country}
        </div>
        {Formatter.FormatDescription(items.weather[0].description)}
        <div className="summary-row">
          <img
            src={Formatter.FormatWeatherIcon(items.weather[0].icon)}
            className="weather-icon"
            alt={Formatter.FormatDescription(items.weather[0].description)}
          />
          <div>
            <div className="temperature">{Formatter.FormatTemp(items.main.temp)}</div>
            <div className="temperature-range">
              ({Formatter.FormatTemp(items.main.temp_min)} - {Formatter.FormatTemp(items.main.temp_max)})
            </div>
          </div>
        </div>
        <p className="">Feels like {Formatter.FormatTemp(items.main.feels_like)}.</p>
      </div>
      <div className="weather-detail">
        <CurrentWeatherDetailRow
          item={["Sunrise", Formatter.FormatDateTime(items.sys.sunrise, items.timezone, "time")]}
        />
        <CurrentWeatherDetailRow
          item={["Sunset", Formatter.FormatDateTime(items.sys.sunset, items.timezone, "time")]}
        />
        <CurrentWeatherDetailRow item={["Humidity", Formatter.FormatPercentage(items.main.humidity)]} />
        <CurrentWeatherDetailRow item={["Visibility", Formatter.ConvertM2KM(items.visibility)]} />
        <CurrentWeatherDetailRow item={["Wind speed", Formatter.FormatSpeed(items.wind.speed)]} />
        <CurrentWeatherDetailRow item={["Wind direction", items.wind.deg]} />
        {items.main.sea_level && (
          <CurrentWeatherDetailRow
            item={["Atmospheric pressure on the sea level", Formatter.FormatPressure(items.main.sea_level)]}
          />
        )}
        {items.main.grnd_level && (
          <CurrentWeatherDetailRow
            item={["Atmospheric pressure on the ground level", Formatter.FormatPressure(items.main.grnd_level)]}
          />
        )}
        {!items.main.sea_level && !items.main.grnd_level && (
          <CurrentWeatherDetailRow item={["Atmospheric pressure", Formatter.FormatPressure(items.main.pressure)]} />
        )}
        {items.clouds && (
          <CurrentWeatherDetailRow item={["Cloudiness", Formatter.FormatPercentage(items.clouds.all)]} />
        )}
        {items.rain && (
          <CurrentWeatherDetailRow
            item={["Rain volume for the last 1 hour", Formatter.FormatVolume(items.rain.rain["1h"])]}
          />
        )}
        {items.rain && (
          <CurrentWeatherDetailRow
            item={["Rain volume for the last 3 hour", Formatter.FormatVolume(items.rain.rain["3h"])]}
          />
        )}
        {items.snow && (
          <CurrentWeatherDetailRow
            item={["Snow volume for the last 1 hour", Formatter.FormatVolume(items.snow.snow["1h"])]}
          />
        )}
        {items.snow && (
          <CurrentWeatherDetailRow
            item={["Snow volume for the last 3 hour", Formatter.FormatVolume(items.snow.snow["3h"])]}
          />
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;

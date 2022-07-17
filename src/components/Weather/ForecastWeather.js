import "./ForecastWeather.css";
import * as Formatter from "../../utils";

const ForecastWeather = (props) => {
  const data = props.data.list;
  const timezone = props.timezone;

  return (
    <div className="forecast-weather">
      {data.slice(0, 10).map((item, idx) => (
        <div className="detail-row">
          <span className="datetime">{Formatter.FormatDateTime(item.dt, timezone, "datetime")}</span>
          <span className="temperature-range">
            <img src={Formatter.FormatWeatherIcon(item.weather[0].icon)} />
            {Formatter.FormatTemp(item.main.temp)}
          </span>
          <span className="description">{Formatter.FormatDescription(item.weather[0].description)}</span>
        </div>
      ))}
    </div>
  );
};

export default ForecastWeather;

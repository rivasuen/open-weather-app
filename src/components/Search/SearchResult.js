const formatTemp = (temp) => {
  return temp + "°C";
};

const formatDateTime = (timestamp, type) => {
  let new_date = new Date(timestamp * 1000);
  let date = new_date.toLocaleDateString();
  let time = new_date.toLocaleTimeString();
  if (type == "date") {
    return date;
  } else if (type == "time") {
    return time;
  } else {
    return date + " " + time;
  }
};

const ConvertM2KM = (distance) => {
  return Math.round((distance / 1000) * 10) / 10 + "km";
};

const SearchResult = (props) => {
  const items = props.items;
  if (items.cod != 200) {
    return <div className="text-danger text-center">{items.message}</div>;
  } else {
    const weather_icon = "http://openweathermap.org/img/wn/" + items.weather[0].icon + "@2x.png";
    const temp = formatTemp(items.main.temp);
    const temp_feels_like = formatTemp(items.main.feels_like);
    const temp_min = formatTemp(items.main.temp_min);
    const temp_max = formatTemp(items.main.temp_max);

    let content_pressure = [];
    if (items.main.pressure) {
      content_pressure.push(
        <tr>
          <th>Atmospheric Pressure: </th>
          <td>{items.main.pressure} hPa</td>
        </tr>
      );
    } else {
      if (items.main.sea_level) {
        content_pressure.push(
          <tr>
            <th>Atmospheric Pressure(Sea Level): </th>
            <td>{items.main.sea_level} hPa</td>
          </tr>
        );
      }
      if (items.main.grnd_level) {
        content_pressure.push(
          <tr>
            <th>Atmospheric Pressure(Ground Level): </th>
            <td>{items.main.grnd_level} hPa</td>
          </tr>
        );
      }
    }

    let content_main_weather = [];
    if (items.clouds) {
      content_main_weather.push(
        <tr>
          <th>Cloudiness: </th>
          <td>{items.clouds.all} %</td>
        </tr>
      );
    }

    if (items.rain) {
      content_main_weather.push(
        <tr>
          <th>Rain volume for the last 1 hour: </th>
          <td>{items.rain.rain["1h"]} mm</td>
        </tr>
      );
      content_main_weather.push(
        <tr>
          <th>Rain volume for the last 3 hours: </th>
          <td>{items.rain.rain["3h"]} mm</td>
        </tr>
      );
    }

    if (items.snow) {
      content_main_weather.push(
        <tr>
          <th>Snow volume for the last 1 hour: </th>
          <td>{items.snow.snow["1h"]} mm</td>
        </tr>
      );
      content_main_weather.push(
        <tr>
          <th>Snow volume for the last 3 hours: </th>
          <td>{items.snow.snow["3h"]} mm</td>
        </tr>
      );
    }

    return (
      <>
        <div className="row p-3">
          <div className="col-md-6 text-center">
            <div className="fs-6 text-muted">Last updated: {formatDateTime(items.dt, "datetime")}</div>
            <div className="card">
              <div className="fs-1">
                {items.name}, {items.sys.country}
              </div>
              <div>
                <img src={weather_icon}></img>
                <span className="fs-1">{temp} </span>
                <span className="fs-6">
                  ({temp_min} - {temp_max})
                </span>
              </div>

              <div>
                <p className="fs-6">
                  Feels like {temp_feels_like}.{" "}
                  {items.weather[0].description.charAt(0).toUpperCase() + items.weather[0].description.slice(1)}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <table>
              <thead>
                <tr>
                  <th>Weather Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Sunrise: </th>
                  <td>{formatDateTime(items.sys.sunrise, "time")}</td>
                </tr>
                <tr>
                  <th>Sunset: </th>
                  <td>{formatDateTime(items.sys.sunset, "time")}</td>
                </tr>
                <tr>
                  <th>Humidity: </th>
                  <td>{items.main.humidity} %</td>
                </tr>
                <tr>
                  <th>Visibility: </th>
                  <td>{ConvertM2KM(items.visibility)}</td>
                </tr>
                <tr>
                  <th>Wind Speed: </th>
                  <td>{items.wind.speed} m/s W</td>
                </tr>
                <tr>
                  <th>Wind Direction: </th>
                  <td>{items.wind.deg}</td>
                </tr>
                {content_pressure}
                {content_main_weather}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default SearchResult;

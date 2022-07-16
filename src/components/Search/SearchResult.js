import SearchResultItem from "./SearchResultItem";

const SearchResult = (props) => {
  const items = props.weather;
  return (
    <>
      <div className="row p-3">
        <div className="col-md-6 text-center">
          <div className="fs-6 text-muted">Last updated: {items.dt}</div>
          <div className="card">
            <div className="fs-1">
              {items.name}, {items.sys.country}
            </div>
            <div>
              <img src={items.weather[0].icon}></img>
              <span className="fs-1">{items.main.temp} </span>
              <span className="fs-6">
                ({items.main.temp_min} - {items.main.temp_max})
              </span>
            </div>

            <div>
              <p className="fs-6">
                Feels like {items.main.feels_like}. {items.weather[0].description}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <table>
            <thead>
              <SearchResultItem item={["Weather Detail"]} />
            </thead>
            <tbody>
              <SearchResultItem item={["Sunrise", items.sys.sunrise]} />
              <SearchResultItem item={["Sunset", items.sys.sunset]} />
              <SearchResultItem item={["Humidity", items.main.humidity]} />
              <SearchResultItem item={["Visibility", items.visibility]} />
              <SearchResultItem item={["Wind speed", items.wind.speed]} />
              <SearchResultItem item={["Wind direction", items.wind.deg]} />
              {items.main.sea_level && <SearchResultItem item={["Atmospheric pressure on the sea level", items.main.sea_level]} />}
              {items.main.grnd_level && <SearchResultItem item={["Atmospheric pressure on the ground level", items.main.grnd_level]} />}
              {!items.main.sea_level && !items.main.grnd_level && <SearchResultItem item={["Atmospheric pressure", items.main.pressure]} />}
              {items.clouds && <SearchResultItem item={["Cloudiness", items.clouds.all]} />}
              {items.rain && <SearchResultItem item={["Rain volume for the last 1 hour", items.rain.rain["1h"]]} />}
              {items.rain && <SearchResultItem item={["Rain volume for the last 3 hour", items.rain.rain["3h"]]} />}
              {items.snow && <SearchResultItem item={["Snow volume for the last 1 hour", items.snow.snow["1h"]]} />}
              {items.snow && <SearchResultItem item={["Snow volume for the last 3 hour", items.snow.snow["3h"]]} />}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SearchResult;

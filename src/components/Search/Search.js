import SearchResult from "./SearchResult";
import { useState, useEffect } from "react";

const Search = () => {
  const [city, setCity] = useState("Toronto");
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    setCity(e.target.city.value);
  };

  const APP_ID = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&q=" + city + "&appid=" + APP_ID)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [city]);

  let show_search_result = "";
  if (error) {
    show_search_result = <div className="text-danger text-center">Failed to fetch</div>;
  } else {
    show_search_result = <SearchResult items={items} />;
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
      {show_search_result}
    </>
  );
};

export default Search;

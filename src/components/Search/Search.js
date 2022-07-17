import "./Search.css";

const Search = ({ onSearchChange }) => {
  const SubmitHandler = (e) => {
    e.preventDefault();
    onSearchChange(e.target.city.value);
  };

  return (
    <>
      <nav className="search-bar">
        <form onSubmit={SubmitHandler}>
          <div className="search-group">
            <input
              className=""
              type="text"
              id="city"
              name="city"
              placeholder="Weather in your city(e.g. Toronto)"
              autoComplete="off"
            />
            <button className="">GO</button>
          </div>
        </form>
      </nav>
      <hr />
    </>
  );
};

export default Search;

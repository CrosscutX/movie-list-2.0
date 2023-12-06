import { useEffect, useState } from "react";
import HomeSearchMovie from "../search/HomeSearchMovie";
import searchIcon from "../../images/search-icon-white.png";
import "../../styles/SearchBar.css";

export default function HomeSearchBar(props) {
  const [displayResults, setDisplayResults] = useState();

  function getMovies(movie) {
    setTimeout(() => {
      async function callSearchApi() {
        const response = await fetch(`/api/search/${movie}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const movieResults = await response.json();
        console.log(movieResults);
        props.setSearchResults(movieResults);
      }
      callSearchApi();
    }, 1000);
  }

  useEffect(() => {
    if (props.searchResults) {
      const movies = props.searchResults.map((movie) => {
        return (
          <HomeSearchMovie
            key={movie.imdbID}
            movie={movie}
            title={movie.Title}
          />
        );
      });
      setDisplayResults(movies);
      console.log(displayResults);
    }
  }, [props.searchResults]);

  return (
    <div className="home-searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          className="searchbar-input"
          id="movie-search"
          onChange={() => {
            //displays the dropdown when the input box has a value
            const input = document.getElementById("movie-search").value;

            if (input.length === 0) {
              props.setSearchDropdown(false);
            } else {
              props.setSearchDropdown(true);
              getMovies(input);
            }
          }}
        />
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </div>
      {props.searchDropdown && (
        <div className="drop-down">{displayResults}</div>
      )}
    </div>
  );
}

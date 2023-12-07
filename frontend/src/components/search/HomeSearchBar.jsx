import { useEffect, useState } from "react";
import HomeSearchMovie from "./HomeSearchMovie";
import searchIcon from "../../images/search-icon-white.png";
import "../../styles/SearchBar.css";

export default function HomeSearchBar(props) {
  const [displayResults, setDisplayResults] = useState();
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    if (searchText !== undefined) {
      let timer = setTimeout(() => {
        async function callSearchApi(movie) {
          const response = await fetch(`/api/search/${movie}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const movieResults = await response.json();
          props.setSearchResults(movieResults);
        }
        callSearchApi(searchText);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchText]);

  useEffect(() => {
    if (props.searchResults) {
      const movies = props.searchResults.map((movie) => {
        return (
          <HomeSearchMovie
            key={movie.imdbID}
            movie={movie}
            title={movie.Title}
            showInfo={props.showInfo}
            setShowInfo={props.setShowInfo}
            setSelectedMovie={props.setSelectedMovie}
            setDisplayType={props.setDisplayType}
          />
        );
      });
      setDisplayResults(movies);
    }
  }, [props.searchResults, props.showInfo]);
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
              //Fixes a display issue, empties the dropdown when we hit 0 display results
              setDisplayResults();
            } else {
              props.setSearchDropdown(true);
              setSearchText(input);
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

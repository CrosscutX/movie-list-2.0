import React from "react";
import searchIcon from "../../images/search-icon-white.png";
import "../../styles/SearchBar.css";

export default function HomeSearchBar(props) {
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

            async function getMovies(movie) {
              console.log(movie);
              const response = await fetch(`/api/search/${movie}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });
              const movieResults = await response.json();
              console.log(movieResults);
            }
          }}
        />
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </div>
      {props.searchDropdown && (
        <div className="drop-down">
          <div className="drop-down-row">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon-dropdown"
            />
            <span className="search-movie-title">Joker</span>
          </div>
          <div className="drop-down-row">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon-dropdown"
            />
            <span className="search-movie-title">Talk To Me</span>
          </div>
          <div className="drop-down-row">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon-dropdown"
            />
            <span className="search-movie-title">The Thing</span>
          </div>
          <div className="drop-down-row">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon-dropdown"
            />
            <span className="search-movie-title">El Topo</span>
          </div>
          <div className="drop-down-row">
            <img
              src={searchIcon}
              alt="Search Icon"
              className="search-icon-dropdown"
            />
            <span className="search-movie-title">The Batman</span>
          </div>
        </div>
      )}
    </div>
  );
}

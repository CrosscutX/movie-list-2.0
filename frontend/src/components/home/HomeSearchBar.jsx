import React from "react";
import searchIcon from "../../images/search-icon-white.png";
import "../../styles/SearchBar.css";

export default function HomeSearchBar() {
  return (
    <div className="home-searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          className="searchbar-input"
          id="movie-search"
        />
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </div>
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
    </div>
  );
}

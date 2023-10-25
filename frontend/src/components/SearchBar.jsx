import React from "react";
import searchIcon from "../images/search-icon-white.png";
import "../styles/Components.css";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          className="searchbar-input"
        />
        <img src={searchIcon} alt="Search Icon" className="search-icon" />
      </div>
    </div>
  );
}

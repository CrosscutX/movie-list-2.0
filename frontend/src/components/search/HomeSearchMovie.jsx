import React from "react";
import searchIcon from "../../images/search-icon-white.png";

export default function HomeSearchMovie(props) {
  return (
    <div className="home-search-movie">
      <div className="drop-down-row">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="search-icon-dropdown"
        />
        <span className="search-movie-title">{props.title}</span>
      </div>
    </div>
  );
}

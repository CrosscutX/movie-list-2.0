import React from "react";

export default function SearchMovie(props) {
  function displayScore() {
    if (props.score === undefined) {
      return "N/A";
    }
    return props.score.slice(0, -1);
  }
  return (
    <div
      className="search-movie"
      onClick={(e) => {
        e.stopPropagation();
        props.setSelectedMovie(props.movie);
        props.setDisplayType("search");
        if (props.showInfo === true) {
          props.setShowInfo(false);
        } else {
          props.setShowInfo(true);
        }
      }}
    >
      <img src={props.image} alt="Joker" />
      <span className="search-movie-title">{props.title}</span>
      <div className="rating">{displayScore()}</div>
    </div>
  );
}

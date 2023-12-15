import React from "react";
import JokerPic from "../../images/Joker.jpg";

export default function SearchMovie(props) {
  return (
    <div
      className="search-movie"
      onClick={(e) => {
        console.log(props.showInfo);
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
      <img src={JokerPic} alt="Joker" />
      <span className="search-movie-title">{props.title}</span>
      <div className="rating">{props.score}</div>
    </div>
  );
}

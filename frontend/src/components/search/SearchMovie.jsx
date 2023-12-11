import React from "react";
import JokerPic from "../../images/Joker.jpg";

export default function SearchMovie(props) {
  console.log(props.title);
  return (
    <div className="search-movie">
      <img src={JokerPic} alt="Joker" />
      <span className="search-movie-title">{props.title}</span>
      <div className="rating">{props.score}</div>
    </div>
  );
}

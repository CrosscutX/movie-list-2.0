import React from "react";
import JokerPic from "../../images/Joker.jpg";

export default function SearchMovie() {
  return (
    <div className="search-movie">
      <img src={JokerPic} alt="Joker" />
      <span className="search-movie-title">Joker</span>
      <div className="rating">90</div>
    </div>
  );
}

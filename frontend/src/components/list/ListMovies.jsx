import React from "react";
import Movie from "./Movie";
import JokerPic from "../../images/Joker.jpg";
import "../../styles/List.css";

export default function ListMovies(props) {
  return (
    <div className="list-movies">
      <h2>List Movies</h2>
      <div className="list-movies-container">
        <Movie
          poster={JokerPic}
          setShowInfo={props.setShowInfo}
          showInfo={props.showInfo}
        />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
      </div>
    </div>
  );
}

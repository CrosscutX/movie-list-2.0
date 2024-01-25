import { useState, useEffect } from "react";
import "../../styles/List.css";

export default function Movie(props) {
  const [movieClassName, setMovieClassName] = useState("movie");

  useEffect(() => {
    if (props.showInfo === false) {
      setMovieClassName("movie");
    } else {
      setMovieClassName("movie-no-hover");
    }
  });

  return (
    <div className={movieClassName}>
      <img
        src={props.poster}
        alt="Poster"
        onClick={(e) => {
          e.stopPropagation();
          props.setSelectedMovie(props.movie);
          props.setDisplayType("info");
          props.setDisplaySelectMovieList(false);
          if (props.showInfo === true) {
            props.setShowInfo(false);
          } else {
            props.setShowInfo(true);
          }
        }}
      />
    </div>
  );
}

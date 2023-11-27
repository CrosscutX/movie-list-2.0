import React from "react";
import "../../styles/List.css";

export default function Movie(props) {
  return (
    <div className="movie">
      <img
        src={props.poster}
        alt="Poster"
        onClick={(e) => {
          if (props.showInfo === false) {
            e.stopPropagation();
            props.setSelectedMovie(props.movie);
            props.setShowInfo(true);
          }
        }}
      />
    </div>
  );
}

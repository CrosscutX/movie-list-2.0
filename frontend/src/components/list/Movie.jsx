import React from "react";
import "../../styles/List.css";

export default function Movie(props) {
  console.log(props.showInfo);
  return (
    <div className="movie">
      <img
        src={props.poster}
        alt="Poster"
        onClick={(e) => {
          if (props.showInfo === false) {
            e.stopPropagation();
            props.setShowInfo(true);
          }
        }}
      />
    </div>
  );
}

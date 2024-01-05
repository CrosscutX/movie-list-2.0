import React from "react";
import "../../styles/List.css";

export default function FriendMovie(props) {
  return (
    <div className="movie">
      <img
        src={props.poster}
        alt="Poster"
        onClick={(e) => {
          e.stopPropagation();
          props.setSelectedMovie(props.movie);
          props.setDisplayType("");
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

import React from "react";

export default function movieInfo(props) {
  return (
    <div className="movie-info">
      <span className="x-button">X</span>
      <div className="info-header">
        <button type="button" className="back-button">
          &lt; Back
        </button>
        <span className="movie-title">Joker</span>
      </div>
    </div>
  );
}

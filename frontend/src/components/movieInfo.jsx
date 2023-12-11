import React from "react";

export default function movieInfo(props) {
  function clearInfo(e) {
    e.stopPropagation();
    props.setShowInfo(false);
  }

  // Formatting the date for our American eyes.
  const dateString = props.selectedMovie.release_date;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="movie-info-component">
      <div className="movie-info">
        <span className="x-button" onClick={clearInfo}>
          X
        </span>
        <div className="info-header">
          <button type="button" className="back-button" onClick={clearInfo}>
            &lt; Back
          </button>
          <span className="movie-title">{props.selectedMovie.title}</span>
        </div>
        <div className="info-container">
          <div className="info-row">
            <span>Description: {props.selectedMovie.description}</span>
          </div>
          <div className="info-row">
            <span>Genre: {props.selectedMovie.genre}</span>
          </div>
          <div className="info-row">
            <span>Director: {props.selectedMovie.director}</span>
          </div>
          <div className="info-row">
            <span>Writers: {props.selectedMovie.writers}</span>
          </div>
          <div className="info-row">
            <span>Actors: {props.selectedMovie.actors}</span>
          </div>
          <div className="info-row">
            <span>Release Date: {formattedDate}</span>
          </div>
          <div className="info-row">
            <span>Score: {props.selectedMovie.score}</span>
          </div>
          <div className="info-row">
            <span>Box Office: {props.selectedMovie.boxoffice}</span>
          </div>
        </div>
        <div className="info-button-container">
          <button type="button" className="delete-button">
            Delete
          </button>
          <div className="checkbox-container">
            <label htmlFor="info-watched">Watched</label>
            <input type="checkbox" id="info-watched" />
          </div>
        </div>
      </div>
    </div>
  );
}

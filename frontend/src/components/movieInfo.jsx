import React from "react";

export default function movieInfo(props) {
  function clearInfo(e) {
    e.stopPropagation();
    props.setShowInfo(false);
  }

  return (
    <div className="movie-info">
      <span className="x-button" onClick={clearInfo}>
        X
      </span>
      <div className="info-header">
        <button type="button" className="back-button" onClick={clearInfo}>
          &lt; Back
        </button>
        <span className="movie-title">Joker</span>
      </div>
      <div className="info-container">
        <div className="info-row">
          <span>Title:</span>
        </div>
        <div className="info-row">
          <span>Description:</span>
        </div>
        <div className="info-row">
          <span>Director:</span>
        </div>
        <div className="info-row">
          <span>Writers:</span>
        </div>
        <div className="info-row">
          <span>Actors:</span>
        </div>
        <div className="info-row">
          <span>Release Date:</span>
        </div>
        <div className="info-row">
          <span>Score:</span>
        </div>
        <div className="info-row">
          <span>Box Office:</span>
        </div>
      </div>
      <div className="info-button-container">
        <button type="button" className="delete-button">
          Delete
        </button>
        <div className="checkbox-container">
          <label htmlFor="watched">Watched</label>
          <input type="checkbox" id="watched" />
        </div>
      </div>
    </div>
  );
}

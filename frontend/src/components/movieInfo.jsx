import { useEffect, useState } from "react";
import SelectMovieList from "./list/SelectMovieList";

export default function movieInfo(props) {
  const [allListId, setAllListId] = useState();
  const [watchedValue, setWatchedValue] = useState(false);
  console.log(watchedValue);
  function clearInfo(e) {
    e.stopPropagation();
    props.setShowInfo(false);
    if (props.setDisplaySelectMovieList) {
      props.setDisplaySelectMovieList(false);
    }
  }
  // Formatting the date for our American eyes.
  const dateString = props.selectedMovie.release_date;
  const date = new Date(dateString);
  // Formatting for score
  function displayScore() {
    if (props.selectedMovie.score === undefined) {
      return "N/A";
    }
    return props.selectedMovie.score.slice(0, -1);
  }

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function updateWatchedUI(watchedBoolean) {
    // Updates watched values for filtering purposes
    const updatedMovieList = props.listOfMovies.map((movie) => {
      if (props.selectedMovie._id === movie._id) {
        return { ...movie, watched: !movie.watched };
      }
      return movie;
    });

    props.setListOfMovies(updatedMovieList);

    // Setting the updated list for UI adjustments.
    let updatedFilteredMovieList = props.filteredMovieList;
    let isInList = false;
    // Checks to see if the movie is in the list
    for (let i = 0; i < props.filteredMovieList.length; i++) {
      if (props.filteredMovieList[i]._id === props.selectedMovie._id) {
        isInList = true;
      }
    }

    // Removes movie from filtered list if user deselects watched checkbox, and watched filter is toggled.
    if (watchedBoolean === false && props.watched === "watched") {
      updatedFilteredMovieList = props.filteredMovieList.filter(
        (movie) => props.selectedMovie._id !== movie._id
      );
      props.setFilteredMovieList(updatedFilteredMovieList);
      // Opposte of the top, if they turn the checkbox on,and the watched filter is set to notwatched
      // then we remove the movie from the filtered list.
    } else if (watchedBoolean === true && props.watched === "notWatched") {
      updatedFilteredMovieList = props.filteredMovieList.filter(
        (movie) => props.selectedMovie._id !== movie._id
      );
      props.setFilteredMovieList(updatedFilteredMovieList);
    }
    // Code that re-adds movies to filtered lists in the case that users click the watched checkbox twice.
    console.log(props.watched);
    if (
      watchedBoolean === true &&
      props.watched === "watched" &&
      isInList === false
    ) {
      props.setFilteredMovieList((prevFilteredMovieList) => [
        ...prevFilteredMovieList,
        props.selectedMovie,
      ]);
    } else if (
      watchedBoolean === false &&
      props.watched === "notWatched" &&
      isInList === false
    ) {
      props.setFilteredMovieList((prevFilteredMovieList) => [
        ...prevFilteredMovieList,
        props.selectedMovie,
      ]);
    }
  }
  // Sets the all list for sure
  useEffect(() => {
    async function fetchAllList() {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/lists/${user.id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      const userLists = await response.json();
      setAllListId(userLists[0]);
    }
    fetchAllList();
  }, []);
  // Setting the initial watched value so that the ui properly shows.
  useEffect(() => {
    async function getWatched() {
      try {
        const response = await fetch(
          `/api/lists/${props.selectedUserList}/movies/${props.selectedMovie._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        );
        const watchedBoolean = await response.json();
        setWatchedValue(watchedBoolean);
      } catch (error) {
        console.error("Error patching watched:", error);
      }
    }
    console.log(props.displayType);
    if (props.displayType === "info") {
      getWatched();
    }
  }, []);

  async function changeWatched() {
    try {
      const response = await fetch(
        `/api/lists/${props.selectedUserList}/movies/${props.selectedMovie._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      const watchedBoolean = await response.json();
      setWatchedValue(watchedBoolean.value);
      updateWatchedUI(watchedBoolean.value);
    } catch (error) {
      console.error("Error patching watched:", error);
    }
  }

  return (
    <div className="movie-info-component">
      <div className="movie-info">
        {/*Displays the select movie list ui whenever the lists button is clicked*/}
        {props.displaySelectMovieList && (
          <SelectMovieList
            title={props.selectedMovie.title}
            lists={props.userLists}
            setDisplaySelectMovieList={props.setDisplaySelectMovieList}
            setShowInfo={props.setShowInfo}
            selectedMovie={props.selectedMovie}
            selectedUserList={props.selectedUserList}
            filteredMovieList={props.filteredMovieList}
            setFilteredMovieList={props.setFilteredMovieList}
            user={props.user}
          />
        )}
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
            <span>Score: {displayScore()}</span>
          </div>
          <div className="info-row">
            <span>Box Office: {props.selectedMovie.boxoffice}</span>
          </div>
        </div>
        {props.displayType === "info" && (
          <div className="info-button-container">
            <button type="button" className="delete-button">
              Delete
            </button>
            <button
              type="button"
              className="list-button"
              onClick={() => {
                props.setDisplaySelectMovieList(true);
              }}
            >
              Lists
            </button>
            <div className="checkbox-container">
              <label htmlFor="info-watched">Watched</label>
              <input
                type="checkbox"
                id="info-watched"
                onChange={changeWatched}
                checked={watchedValue}
              />
            </div>
          </div>
        )}
        {props.displayType === "search" && (
          <div className="info-button-container">
            <button
              type="button"
              className="add-button"
              onClick={async () => {
                const response = await fetch(`/api/lists/${allListId}/movies`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.user.token}`,
                  },
                  body: JSON.stringify({
                    imdbID: props.selectedMovie.imdbID,
                  }),
                });
                const movieResults = await response.json();
                console.log(movieResults);
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function SelectMovieListItem(props) {
  const [allCheck, setAllCheck] = useState(true);
  const [isChecked, setChecked] = useState(false);
  // Makes it to where we don't display all for list changes
  useEffect(() => {
    if (props.list.listName === "all") {
      setAllCheck(false);
    }
    // Sets the initial checked state if we find a movie inside the list
    if (props.list.movies.length !== 0) {
      for (let i = 0; i < props.list.movies.length; i++) {
        if (props.list.movies[i].imdbID === props.selectedMovie.imdbID) {
          setChecked(true);
        }
      }
    }
  }, []);

  console.log(props.filteredMovieList);
  console.log(props.selectedMovie);

  function addMovieUI() {
    if (props.list._id == props.selectedUserList) {
      props.setFilteredMovieList((prevFilteredMovieList) => [
        ...prevFilteredMovieList,
        props.selectedMovie,
      ]);
    }
  }

  function removeMovieUI() {
    if (props.list._id == props.selectedUserList) {
      props.setFilteredMovieList(
        props.filteredMovieList.filter(
          (movie) => movie._id !== props.selectedMovie._id
        )
      );
    }
  }

  async function addMovieToList(checked) {
    const response = await fetch(`/api/lists/${props.list._id}/movies`, {
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
    // Handles the ui
    if (movieResults.msg === "Movie added to list") {
      setChecked(checked);
      addMovieUI();
    }
  }
  async function deleteFromList(checked) {
    try {
      const response = await fetch(
        `/api/lists/${props.list._id}/movies/${props.selectedMovie._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      const movieResults = await response.json();
      // Handles the ui
      if (movieResults.msg === "Movie was deleted from users list") {
        setChecked(checked);
        removeMovieUI();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="list-item">
      {allCheck && (
        <div className="list-item-container">
          <input
            type="checkbox"
            checked={isChecked}
            id={props.list.listName}
            onChange={(e) => {
              // Handles logic
              const checked = e.target.checked;

              if (checked === true) {
                addMovieToList(checked);
              } else if (checked === false) {
                deleteFromList(checked);
              }
            }}
          />
          <label htmlFor={props.list.listName}>{props.list.listName}</label>
        </div>
      )}
    </div>
  );
}

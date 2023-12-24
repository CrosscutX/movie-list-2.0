import { useEffect, useState } from "react";

export default function SelectMovieListItem(props) {
  const [allCheck, setAllCheck] = useState(true);
  const [isChecked, setChecked] = useState(false);

  // Makes it to where they can't change the all placement
  useEffect(() => {
    if (props.list.listName === "all") {
      setAllCheck(false);
    }
    console.log(props.list.movies);
    if (props.list.movies.length !== 0) {
      console.log(props.list.movies.imdbID);
      for (let i = 0; i < props.list.movies.length; i++) {
        if (props.list.movies[i].imdbID === props.selectedMovie.imdbID) {
          setChecked(true);
        }
      }
    }
  }, []);

  // Code that fires whenever the checkbox changes.
  // useEffect(() => {
  //   async function addMovieToList() {
  //     const response = await fetch(`/api/lists/${props.list._id}/movies`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         imdbID: props.selectedMovie.imdbID,
  //       }),
  //     });
  //     const movieResults = await response.json();
  //     console.log(movieResults);
  //   }
  //   async function deleteFromList() {
  //     const response = await fetch(
  //       `/api/lists/${props.list._id}/movies/${props.selectedMovie._id}`,
  //       {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //     const movieResults = await response.json();
  //     console.log(movieResults);
  //   }
  //   console.log(allCheck);
  //   if (isChecked === true) {
  //     console.log("In ischecked true");
  //     addMovieToList();
  //   } else if (isChecked === false) {
  //     console.log("in ischecked false");
  //     // deleteFromList();
  //   }
  // }, [isChecked]);

  async function addMovieToList() {
    const response = await fetch(`/api/lists/${props.list._id}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imdbID: props.selectedMovie.imdbID,
      }),
    });
    const movieResults = await response.json();
    console.log(movieResults);
  }
  async function deleteFromList() {
    const response = await fetch(
      `/api/lists/${props.list._id}/movies/${props.selectedMovie._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const movieResults = await response.json();
    console.log(movieResults);
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
              // Handles the ui to keep things in sync
              setChecked(checked);

              if (checked === true) {
                console.log("checked");
                addMovieToList();
              } else if (checked === false) {
                console.log("not checked");
                deleteFromList();
              }
            }}
          />
          <label htmlFor={props.list.listName}>{props.list.listName}</label>
        </div>
      )}
    </div>
  );
}

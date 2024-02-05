import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function ListFilter(props) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("Genre...");
  const [rating, setRating] = useState("Rating...");
  // Uses the list of movie ids to get more info and store all the movie info into
  // an array at listOfMovies
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (props.movieListIDS !== undefined) {
        const movies = await Promise.all(
          props.movieListIDS.map(async (movie) => {
            const response = await fetch(`/api/movies/info/${movie.movie}`, {
              headers: {
                Authorization: `Bearer ${props.user.token}`,
              },
            });
            const movieInfo = await response.json();
            // Add the watched attribute to the movieInfo from the list specific watched field
            movieInfo.watched = movie.watched;
            // Add the list id to the movie info so it's easier to reference later
            movieInfo.listID = movie.movie;
            return movieInfo;
          })
        );
        props.setListOfMovies(movies);
      }
    };
    fetchMoviesData();
  }, [props.movieListIDS]);

  function checkTitle(movie) {
    if (title === "") {
      return movie;
    }

    return movie.title.includes(title);
  }

  function checkDirector(movie) {
    if (director === "") {
      return movie;
    }

    return movie.director.includes(director);
  }

  function checkGenre(movie) {
    if (genre === "Genre..." || genre === "All") {
      return movie;
    }

    return movie.genre.includes(genre);
  }

  function checkWatched(movie) {
    if (props.watched === "Watched..." || props.watched === "All") {
      return movie;
    } else if (props.watched === "notWatched") {
      return movie.watched === false;
    } else {
      return movie.watched === true;
    }
  }

  function checkRating(list) {
    if (rating === "Rating..." || rating === "none") {
      return list;
    } else if (rating === "best") {
      list.sort((a, b) => {
        return Number(b.score.slice(0, -1)) - Number(a.score.slice(0, -1));
      });
    } else if (rating === "worst") {
      list.sort((a, b) => {
        return Number(a.score.slice(0, -1)) - Number(b.score.slice(0, -1));
      });
    }
  }

  function rollRandom(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const movieArray = [];
    movieArray.push(list[randomIndex]);
    return movieArray;
  }

  function filterClick() {
    let filteredList = props.listOfMovies
      .filter((movie) => {
        return checkTitle(movie);
      })
      .filter((movie) => {
        return checkDirector(movie);
      })
      .filter((movie) => {
        return checkGenre(movie);
      })
      .filter((movie) => {
        return checkWatched(movie);
      });
    checkRating(filteredList);
    props.setFilteredMovieList(filteredList);
  }

  function randomClick() {
    if (props.listOfMovies.length !== 0) {
      let filteredList = props.listOfMovies;
      filteredList = rollRandom(filteredList);
      if (filteredList[0].watched === true) {
        randomClick();
      }
      props.setFilteredMovieList(filteredList);
    }
  }

  function defaultClick() {
    setTitle("");
    setDirector("");
    setGenre("Genre...");
    props.setWatched("Watched...");
    setRating("Rating...");
    props.setFilteredMovieList(props.listOfMovies);
  }

  return (
    <div className="list-filter">
      <h2>Filters</h2>
      <div className="list-filter-container">
        <div className="filter-top-row">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            className="filter-textbox"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            name="director"
            id="director"
            placeholder="Director..."
            className="filter-textbox"
            value={director}
            onChange={(e) => {
              setDirector(e.target.value);
            }}
          />
        </div>
        <div className="filter-mid-row">
          <select
            name="genre"
            id="genre"
            className="list-button list-filter-button"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option disabled>Genre...</option>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Thriller">Thriller</option>
            <option value="Western">Western</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Animation">Animation</option>
          </select>
          <select
            name="watched"
            id="watched"
            className="list-button list-filter-button"
            value={props.watched}
            onChange={(e) => {
              props.setWatched(e.target.value);
            }}
          >
            <option disabled>Watched...</option>
            <option value="All">All</option>
            <option value="notWatched">Not Watched</option>
            <option value="watched">Watched</option>
          </select>
          <select
            name="rating"
            id="rating"
            className="list-button list-filter-button"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          >
            <option disabled>Rating...</option>
            <option value="none">None</option>
            <option value="best">Best</option>
            <option value="worst">Worst</option>
          </select>
        </div>
        <div className="filter-bot-row">
          <div className="list-button random-button" onClick={randomClick}>
            Random
          </div>
          <div className="list-button filter-button" onClick={filterClick}>
            Filter
          </div>
        </div>
      </div>
      <div className="list-button return-button" onClick={defaultClick}>
        Default
      </div>
    </div>
  );
}

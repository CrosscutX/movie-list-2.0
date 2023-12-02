import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function ListFilter(props) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("Genre...");
  const [watched, setWatched] = useState("Watched...");
  const [rating, setRating] = useState("Rating...");
  const [random, setRandom] = useState(false);

  // Uses the list of movie ids to get more info and store all the movie info into
  // an array at listOfMovies
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (props.movieListIDS !== undefined) {
        const movies = await Promise.all(
          props.movieListIDS.map(async (movie) => {
            const response = await fetch(`/api/movies/info/${movie.movie}`);
            const movieInfo = await response.json();
            // Add the watched attribute to the movieInfo from the list specific watched field
            movieInfo.watched = movie.watched;
            // Remove the percentage after the score
            movieInfo.score = movieInfo.score.slice(0, -1);
            // Add the list id to the movie info so it's easier to reference later
            movieInfo.listID = movie.movie;
            return movieInfo;
          })
        );
        setListOfMovies(movies);
        props.setFilteredMovieList(movies);
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
    if (watched === "Watched..." || watched === "All") {
      return movie;
    } else if (watched === "notWatched") {
      return movie.watched === false;
    } else {
      return movie.watched === true;
    }
  }

  function checkRating(list) {
    console.log(list);
    if (rating === "Rating..." || rating === "none") {
      return list;
    } else if (rating === "best") {
      list.sort((a, b) => b.score - a.score);
    } else if (rating === "worst") {
      list.sort((a, b) => a.score - b.score);
    }
  }

  function filterClick() {
    let filteredList = listOfMovies
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

  function defaultClick() {
    setTitle("");
    setDirector("");
    setGenre("Genre...");
    setWatched("Watched...");
    setRating("Rating...");
    setRandom(false);
    props.setFilteredMovieList(listOfMovies);
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
            value={watched}
            onChange={(e) => {
              setWatched(e.target.value);
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
          <div className="list-button random-button">Random</div>
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

import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function ListFilter(props) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [watched, setWatched] = useState("");
  const [rating, setRating] = useState("");
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

  function filterClick() {
    let filteredList = listOfMovies.filter((movie) => {
      return checkTitle(movie);
    });
    props.setFilteredMovieList(filteredList);
  }

  function defaultClick() {
    setTitle("");
    setDirector("");
    setGenre("");
    setWatched("");
    setRating("");
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
          />
        </div>
        <div className="filter-mid-row">
          <select
            name="genre"
            id="genre"
            className="list-button list-filter-button"
            defaultValue="Genre..."
          >
            <option disabled>Genre...</option>
            <option value="all">All</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="horror">Horror</option>
            <option value="sciFi">Sci-Fi</option>
            <option value="fantasy">Fantasy</option>
            <option value="animation">Animation</option>
          </select>
          <select
            name="watched"
            id="watched"
            className="list-button list-filter-button"
            defaultValue="Watched..."
          >
            <option disabled>Watched...</option>
            <option value="all">All</option>
            <option value="notWatched">Not Watched</option>
            <option value="watched">Watched</option>
          </select>
          <select
            name="rating"
            id="rating"
            className="list-button list-filter-button"
            defaultValue="Rating..."
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

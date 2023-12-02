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

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (props.movieListIDS !== undefined) {
        const movies = await Promise.all(
          props.movieListIDS.map(async (movie) => {
            const response = await fetch(`/api/movies/info/${movie.movie}`);
            const movieInfo = await response.json();
            movieInfo.watched = movie.watched;
            return movieInfo;
          })
        );
        setListOfMovies(movies);
      }
    };
    fetchMoviesData();
  }, [props.movieListIDS]);
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
          <div className="list-button filter-button">Filter</div>
        </div>
      </div>
      <div className="list-button return-button">Default</div>
    </div>
  );
}

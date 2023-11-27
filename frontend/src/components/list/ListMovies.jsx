import { useEffect, useState } from "react";
import Movie from "./Movie";
import "../../styles/List.css";

export default function ListMovies(props) {
  const [movieListIDS, setMovieListIDS] = useState([]);
  const [listOfMovies, setListOfMovies] = useState([]);
  //Runs whenever the selected list changes
  useEffect(() => {
    const fetchMoviesList = async () => {
      const response = await fetch(`/api/movies/${props.selectedUserList}`);
      let movieIds = await response.json();
      movieIds = movieIds.movies;
      setMovieListIDS(movieIds);
    };
    fetchMoviesList();
  }, [props.selectedUserList]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (movieListIDS !== undefined) {
        const movies = await Promise.all(
          movieListIDS.map(async (id) => {
            const response = await fetch(`/api/movies/info/${id}`);
            const movieInfo = await response.json();
            return (
              <Movie
                key={movieInfo.imdbID}
                movie={movieInfo}
                title={movieInfo.title}
                poster={movieInfo.image}
                showInfo={props.showInfo}
                setShowInfo={props.setShowInfo}
                toggleInfoPanel={props.toggleInfoPanel}
                setSelectedMovie={props.setSelectedMovie}
              />
            );
          })
        );
        setListOfMovies(movies);
      }
    };
    fetchMoviesData();
  }, [movieListIDS, props.showInfo]);
  return (
    <div className="list-movies">
      <h2>List Movies</h2>
      <div className="list-movies-container">{listOfMovies}</div>
    </div>
  );
}

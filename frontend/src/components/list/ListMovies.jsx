import { useEffect, useState } from "react";
import Movie from "./Movie";
import "../../styles/List.css";

export default function ListMovies(props) {
  const [listOfMovies, setListOfMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = () => {
      if (props.filteredMovieList) {
        const movies = props.filteredMovieList.map((movie) => {
          return (
            <Movie
              key={movie.imdbID}
              movie={movie}
              title={movie.title}
              poster={movie.image}
              showInfo={props.showInfo}
              setShowInfo={props.setShowInfo}
              setSelectedMovie={props.setSelectedMovie}
              setDisplayType={props.setDisplayType}
              setDisplaySelectMovieList={props.setDisplaySelectMovieList}
            />
          );
        });
        setListOfMovies(movies);
      }
    };
    fetchMoviesData();
  }, [props.filteredMovieList, props.showInfo]);
  return (
    <div className="list-movies">
      <h2>Movies</h2>
      <div className="list-movies-container">{listOfMovies}</div>
    </div>
  );
}

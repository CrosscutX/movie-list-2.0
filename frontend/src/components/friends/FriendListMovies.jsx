import { useEffect, useState } from "react";
import FriendMovie from "./FriendMovie";
import "../../styles/List.css";

export default function FriendListMovies(props) {
  const [listOfMovies, setListOfMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = () => {
      if (props.filteredMovieList) {
        const movies = props.filteredMovieList.map((movie) => {
          return (
            <FriendMovie
              key={movie.imdbID}
              movie={movie}
              title={movie.title}
              poster={movie.image}
              showInfo={props.showInfo}
              setShowInfo={props.setShowInfo}
              setSelectedMovie={props.setSelectedMovie}
              displayType={props.displayType}
              setDisplayType={props.setDisplayType}
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
      <h2>List Movies</h2>
      <div className="list-movies-container">{listOfMovies}</div>
    </div>
  );
}

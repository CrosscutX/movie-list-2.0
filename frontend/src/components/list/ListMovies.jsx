import { useEffect, useState } from "react";
import Movie from "./Movie";
import "../../styles/List.css";

export default function ListMovies(props) {
  const [listOfMovies, setListOfMovies] = useState([]);

  // Maps through the list of movie ids and creates an array of movie components to display
  // on the page.
  useEffect(() => {
    const fetchMoviesData = async () => {
      if (props.movieListIDS !== undefined) {
        const movies = await Promise.all(
          props.movieListIDS.map(async (id) => {
            const response = await fetch(`/api/movies/info/${id.movie}`);
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
  }, [props.movieListIDS, props.showInfo]);
  return (
    <div className="list-movies">
      <h2>List Movies</h2>
      <div className="list-movies-container">{listOfMovies}</div>
    </div>
  );
}

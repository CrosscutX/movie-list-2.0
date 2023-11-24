import { useEffect, useState } from "react";
import Movie from "./Movie";
import JokerPic from "../../images/Joker.jpg";
import "../../styles/List.css";

export default function ListMovies(props) {
  const [movieList, setMovieList] = useState([]);
  //Runs whenever the selected list changes
  useEffect(() => {
    const fetchMoviesList = async () => {
      const response = await fetch(`/api/movies/${props.selectedUserList}`);
      let movieIds = await response.json();
      movieIds = movieIds.movies;
      setMovieList(movieIds);
    };
    fetchMoviesList();
  }, [props.selectedUserList]);

  useEffect(() => {
    // const fetchMoviesData = async () => {
    //   if (movieList !== undefined) {
    //     const promises = movieList.map(async (id) => {
    //       const response = await fetch(`/api/movies/info/${id}`);
    //       const movieInfo = await response.json();
    //       console.log(movieInfo);
    //     });
    //   }
    // };
    // fetchMoviesData();
  }, [movieList]);

  return (
    <div className="list-movies">
      <h2>List Movies</h2>
      <div className="list-movies-container">
        <Movie
          poster={JokerPic}
          setShowInfo={props.setShowInfo}
          showInfo={props.showInfo}
        />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
        <Movie poster={JokerPic} />
      </div>
    </div>
  );
}

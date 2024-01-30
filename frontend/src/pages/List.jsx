import { useState, useEffect } from "react";
import ListSelector from "../components/list/ListSelector";
import ListFilter from "../components/list/ListFilter";
import ListMovies from "../components/list/ListMovies";
import MovieInfo from "../components/movieInfo";
import "../styles/Components.css";
import "../styles/List.css";

export default function List(props) {
  const [selectedOption, setSelectedOption] = useState("none");
  const [userLists, setUserLists] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState("");
  const [listOfMovies, setListOfMovies] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState("");
  const [movieListIDS, setMovieListIDS] = useState([]);
  // State for the screen that allows you to add movies to different lists
  const [displaySelectMovieList, setDisplaySelectMovieList] = useState(false);
  // Used to track the state of watched button in movieList, also aids in updating the UI.
  const [watched, setWatched] = useState("Watched...");
  //handles clicking off of the movie-info panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const infoElement = document.querySelector(".movie-info");
      if (!infoElement) {
        return;
      }
      if (!infoElement.contains(e.target)) {
        e.stopPropagation();
        props.setShowInfo(false);
        setDisplaySelectMovieList(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  // Inital call to show the movies
  useEffect(() => {
    const fetchLists = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      const response = await fetch(`/api/lists/${userId}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      const lists = await response.json();
      setSelectedUserList(lists[0]);
    };
    fetchLists();
  }, []);

  //Gets all lists from the user account
  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(`/api/lists/${props.user.id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      const lists = await response.json();
      //For testing
      setUserLists(lists);
    };
    fetchLists();
  }, [selectedOption]);

  //Runs whenever the selected list changes, gets a list of movie ids and adds to state
  useEffect(() => {
    const fetchMoviesList = async () => {
      const response = await fetch(`/api/movies/${selectedUserList}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      let movieIds = await response.json();
      if (movieIds.movies !== undefined) {
        setMovieListIDS(movieIds.movies);
      }
    };
    fetchMoviesList();
  }, [selectedUserList]);

  useEffect(() => {
    const fetchMoviesList = async () => {
      const response = await fetch(`/api/movies/${selectedUserList}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      let movieIds = await response.json();

      // OH LAWD HE'S COOKIN
      const fetchMoviesData = async () => {
        if (movieIds) {
          const movies = await Promise.all(
            movieIds.movies.map(async (movie) => {
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
          setFilteredMovieList(movies);
        }
      };
      fetchMoviesData();
    };
    if (selectedUserList) {
      fetchMoviesList();
    }
  }, [selectedUserList]);

  return (
    <div className="list">
      {props.showInfo && (
        <MovieInfo
          showInfo={props.showInfo}
          setShowInfo={props.setShowInfo}
          selectedMovie={props.selectedMovie}
          selectedUserList={selectedUserList}
          listOfMovies={listOfMovies}
          setListOfMovies={setListOfMovies}
          filteredMovieList={filteredMovieList}
          setFilteredMovieList={setFilteredMovieList}
          displayType={props.displayType}
          userLists={userLists}
          displaySelectMovieList={displaySelectMovieList}
          setDisplaySelectMovieList={setDisplaySelectMovieList}
          watched={watched}
          setWatched={setWatched}
          user={props.user}
        />
      )}
      <div className="list-container">
        <h1>Your Lists</h1>
        <ListSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          userLists={userLists}
          setSelectedUserList={setSelectedUserList}
          selectedUserList={selectedUserList}
          user={props.user}
        />
        <ListFilter
          movieListIDS={movieListIDS}
          listOfMovies={listOfMovies}
          setListOfMovies={setListOfMovies}
          filteredMovieList={filteredMovieList}
          setFilteredMovieList={setFilteredMovieList}
          displaySelectMovieList={displaySelectMovieList}
          watched={watched}
          setWatched={setWatched}
          user={props.user}
        />
        <ListMovies
          setShowInfo={props.setShowInfo}
          showInfo={props.showInfo}
          selectedUserList={selectedUserList}
          setSelectedMovie={props.setSelectedMovie}
          movieListIDS={movieListIDS}
          filteredMovieList={filteredMovieList}
          setDisplayType={props.setDisplayType}
          setDisplaySelectMovieList={setDisplaySelectMovieList}
        />
      </div>
    </div>
  );
}

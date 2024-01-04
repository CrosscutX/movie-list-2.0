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
  const [filteredMovieList, setFilteredMovieList] = useState("");
  const [movieListIDS, setMovieListIDS] = useState([]);
  // State for the scren that allows you to add movies to different lists
  const [displaySelectMovieList, setDisplaySelectMovieList] = useState(false);

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
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
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
      setSelectedUserList(lists[0]);
    };
    fetchLists();
  }, []);

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
  }, [selectedUserList, displaySelectMovieList]);

  return (
    <div className="list">
      {props.showInfo && (
        <MovieInfo
          showInfo={props.showInfo}
          setShowInfo={props.setShowInfo}
          selectedMovie={props.selectedMovie}
          displayType={props.displayType}
          userLists={userLists}
          displaySelectMovieList={displaySelectMovieList}
          setDisplaySelectMovieList={setDisplaySelectMovieList}
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
          filteredMovieList={filteredMovieList}
          setFilteredMovieList={setFilteredMovieList}
          displaySelectMovieList={displaySelectMovieList}
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
        />
      </div>
    </div>
  );
}

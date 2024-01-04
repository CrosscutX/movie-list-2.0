import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FriendMovieInfo from "../components/friends/FriendMovieInfo";
import FriendListSelector from "../components/friends/FriendListSelector";
import FriendListFilter from "../components/friends/FriendListFilter";
import FriendListMovies from "../components/friends/FriendListMovies";

export default function FriendsMovieList(props) {
  const [selectedOption, setSelectedOption] = useState("none");
  const [userLists, setUserLists] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState("");
  const [movieListIDS, setMovieListIDS] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState("");
  const { name, id } = useParams();

  //Get friends movies
  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(`/api/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      const lists = await response.json();
      setUserLists(lists);
      setSelectedUserList(lists[0]);
    };
    fetchLists();
  }, []);

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

  return (
    <div className="friend-list">
      {props.showInfo && (
        <FriendMovieInfo
          showInfo={props.showInfo}
          setShowInfo={props.setShowInfo}
          selectedMovie={props.selectedMovie}
        />
      )}
      <div className="friend-list--container">
        <h1>{name}'s Lists</h1>
        <FriendListSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          userLists={userLists}
          setSelectedUserList={setSelectedUserList}
          selectedUserList={selectedUserList}
          user={props.user}
        />
        <FriendListFilter
          movieListIDS={movieListIDS}
          filteredMovieList={filteredMovieList}
          setFilteredMovieList={setFilteredMovieList}
          user={props.user}
        />
        <FriendListMovies
          setShowInfo={props.setShowInfo}
          showInfo={props.showInfo}
          selectedUserList={selectedUserList}
          setSelectedMovie={props.setSelectedMovie}
          movieListIDS={movieListIDS}
          filteredMovieList={filteredMovieList}
        />
      </div>
    </div>
  );
}

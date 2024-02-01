import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FriendListSelector from "../components/friends/FriendListSelector";
import FriendListFilter from "../components/friends/FriendListFilter";
import FriendListMovies from "../components/friends/FriendListMovies";
import MovieInfo from "../components/movieInfo";

export default function FriendsMovieList(props) {
  const [selectedOption, setSelectedOption] = useState("none");
  const [userLists, setUserLists] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState("");
  const [movieListIDS, setMovieListIDS] = useState([]);
  const [filteredMovieList, setFilteredMovieList] = useState("");
  const [friendID, setFriendID] = useState("");
  const { name, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkFriendStatus = async () => {
      let isFriends = false;

      const response = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("User fetch failed");
      }

      const data = await response.json();

      for (const friend of data.friends) {
        if (friend._id == props.user.id) {
          if (friend.accepted == true) {
            isFriends = true;
          }
        }
      }
      if (!isFriends) {
        navigate("/friends");
      }
    };

    checkFriendStatus();
  }, []);

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

  useEffect(() => {
    // Get the end of the url and set it to state
    const pathSegments = window.location.pathname.split("/");
    let lastSegment = pathSegments[pathSegments.length - 1];
    lastSegment = decodeURIComponent(lastSegment);
    setFriendID(lastSegment);
  });

  return (
    <div className="friend-list">
      {props.showInfo && (
        <MovieInfo
          showInfo={props.showInfo}
          setShowInfo={props.setShowInfo}
          selectedMovie={props.selectedMovie}
          user={props.user}
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
          friendID={friendID}
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
          displayType={props.displayType}
          setDisplayType={props.setDisplayType}
        />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import "../styles/Friends.css";
import FriendCard from "../components/friends/FriendSearchCard";
import UserFriendCard from "../components/friends/UserFriends";

export default function Friends() {
  const [display, setDisplay] = useState("friends");
  let jsonUser = localStorage.getItem("user");
  jsonUser = JSON.parse(jsonUser);
  const displayUsername = jsonUser.username;

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  //For getting logged in users friends on page load
  useEffect(() => {
    fetch(`/api/users/${jsonUser.id}`)
      .then((response) => response.json())
      .then((user) => {
        const friends = user.friends.map((friend) => {
          return fetch(`/api/users/${friend._id}`).then((response) =>
            response.json()
          );
        });
        Promise.all(friends).then((friendData) => {
          setUserFriends(friendData);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [display]);

  //Handles friend search input calls
  let handleChange = (e) => {
    setSearchInput(e.target.value);

    if (searchInput != 0) {
      fetch(`/api/users/search/${searchInput}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="friends">
      {display === "friends" && (
        <div className="friends-selection">
          <h1>Friends</h1>
          <div
            className="friends-button"
            onClick={() => {
              setDisplay("add");
            }}
          >
            Add Friend
          </div>
          <div className="friends-container">
            <h2>{displayUsername}</h2>
            <div className="friends-list">
              <input type="text" placeholder="Search Friends" />
              <div className="friends-search-results">
                {userFriends.map((friend) => (
                  <UserFriendCard
                    key={friend._id}
                    friends={friend.friends}
                    friendName={friend.username}
                    id={friend._id}
                    logInUser={jsonUser.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {display === "add" && (
        <div className="new-friends-selection">
          <h1>Add</h1>
          <div
            className="friends-button"
            onClick={() => {
              setDisplay("friends");
            }}
          >
            Return
          </div>
          <div className="friends-container">
            <input
              type="text"
              placeholder="Add Friend"
              className="add-friend-textbox"
              onChange={handleChange}
              value={searchInput}
            />
            <div className="friends-search-results">
              {searchResults.map((friend) => (
                <FriendCard
                  key={friend._id}
                  friendName={friend.username}
                  id={friend._id}
                  logInUser={jsonUser.id}
                  logInUserFriends={userFriends}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

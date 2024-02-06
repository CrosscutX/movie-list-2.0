import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import "../styles/Friends.css";
import FriendCard from "../components/friends/FriendSearchCard";
import UserFriendCard from "../components/friends/UserFriends";

export default function Friends(props) {
  const [display, setDisplay] = useState("friends");
  const navigate = useNavigate();
  const { logout } = useLogout();
  let jsonUser = localStorage.getItem("user");
  jsonUser = JSON.parse(jsonUser);
  const displayUsername = jsonUser.username;

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [friendFilter, setFriendFilter] = useState("");
  const [filterAccepted, setFilterAccepted] = useState([]);
  const [filterPending, setFilterPending] = useState([]);
  const [friendChange, setFriendChange] = useState(false);

  let pendingFriends = [];
  let acceptedFriends = [];

  userFriends.forEach((friend) => {
    const isFriend = friend.friends.some(
      (friendRequest) => friendRequest._id === props.user.id
    );

    if (isFriend) {
      const friendsWithUser = friend.friends.find(
        (friendRequest) => friendRequest._id === props.user.id
      );

      if (friendsWithUser.accepted) {
        acceptedFriends.push(friend);
      } else {
        pendingFriends.push(friend);
      }
    }
  });

  //For getting logged in users friends on page load
  useEffect(() => {
    fetch(`/api/users/${jsonUser.id}`, {
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          logout();
          navigate("/login");
          throw new Error("Unauthorized access");
        }
        return response.json();
      })
      .then((user) => {
        const friends = user.friends.map((friend) => {
          return fetch(`/api/users/${friend._id}`, {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }).then((response) => response.json());
        });
        Promise.all(friends).then((friendData) => {
          setUserFriends(friendData);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [display, friendChange]);

  useEffect(() => {
    let handleFriendSearch = () => {
      setFilterPending(
        pendingFriends.filter((friend) =>
          friend.username.toLowerCase().includes(friendFilter.toLowerCase())
        )
      );

      setFilterAccepted(
        acceptedFriends.filter((friend) =>
          friend.username.toLowerCase().includes(friendFilter.toLowerCase())
        )
      );
    };
    handleFriendSearch();
  }, [friendFilter]);

  useEffect(() => {
    //Handles friend search input calls
    let handleChange = () => {
      if (searchInput != 0) {
        fetch(`/api/users/search/${searchInput}`, {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        })
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
    handleChange();
  }, [searchInput]);

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
              <input
                type="text"
                onChange={(e) => {
                  setFriendFilter(e.target.value);
                }}
                value={friendFilter}
                placeholder="Search Friends"
              />
              {friendFilter.length > 0 ? (
                <>
                  {filterPending.length > 0 && (
                    <div className="pending-friends">
                      <h3>Pending Friends</h3>
                      <div className="pending-friends-list">
                        {filterPending.map((friend) => (
                          <UserFriendCard
                            key={friend._id}
                            friends={friend.friends}
                            friendName={friend.username}
                            id={friend._id}
                            logInUser={jsonUser.id}
                            user={props.user}
                            friendChange={friendChange}
                            setFriendChange={setFriendChange}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {filterAccepted.length > 0 && (
                    <div className="friends-search-results">
                      {filterAccepted.map((friend) => (
                        <UserFriendCard
                          key={friend._id}
                          friends={friend.friends}
                          friendName={friend.username}
                          id={friend._id}
                          logInUser={jsonUser.id}
                          user={props.user}
                          friendChange={friendChange}
                          setFriendChange={setFriendChange}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {pendingFriends.length > 0 && (
                    <div className="pending-friends">
                      <h3>Pending Friends</h3>
                      <div className="pending-friends-list">
                        {pendingFriends.map((friend) => (
                          <UserFriendCard
                            key={friend._id}
                            friends={friend.friends}
                            friendName={friend.username}
                            id={friend._id}
                            logInUser={jsonUser.id}
                            user={props.user}
                            friendChange={friendChange}
                            setFriendChange={setFriendChange}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {acceptedFriends.length > 0 && (
                    <div className="friends-search-results">
                      {acceptedFriends.map((friend) => (
                        <UserFriendCard
                          key={friend._id}
                          friends={friend.friends}
                          friendName={friend.username}
                          id={friend._id}
                          logInUser={jsonUser.id}
                          user={props.user}
                          friendChange={friendChange}
                          setFriendChange={setFriendChange}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
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
              setSearchInput("");
            }}
          >
            Return
          </div>
          <div className="friends-container">
            <input
              type="text"
              placeholder="Add Friend"
              className="add-friend-textbox"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
            <h2 className="friend-search-header">Users</h2>
            <div className="friends-search-results">
              {searchResults.map((friend) => (
                <FriendCard
                  key={friend._id}
                  friendName={friend.username}
                  id={friend._id}
                  logInUser={jsonUser.id}
                  logInUserFriends={userFriends}
                  user={props.user}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

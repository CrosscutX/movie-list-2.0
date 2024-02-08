import { useState } from "react";

export default function FriendCard(props) {
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let logInFriends = props.logInUserFriends;
  let isFriend = false;

  //Checking to see if user returned is already in logged in users friendlist for rendering the add button
  for (let friend of logInFriends) {
    if (friend._id == props.id) {
      isFriend = true;
      break;
    } else {
      isFriend = false;
    }
  }

  function handleClick() {
    fetch(
      `https://movie-list-2-0-backend.onrender.com/api/users/${props.logInUser}/friends/${props.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Friend successfully added") {
          setShowAddMessage(true);
          setTimeout(() => {
            setShowAddMessage(false);
          }, 2000);
        } else {
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error adding friend", error);
      });
  }
  return (
    <div className="add-friend-card">
      <span className="friend-card--name">{props.friendName}</span>
      <div className="add-button-container">
        {isFriend ? null : (
          <button onClick={handleClick} className="add-button-friends">
            Add
          </button>
        )}
        {showAddMessage && (
          <span className="add-text">Friend has been added</span>
        )}
        {showErrorMessage && (
          <span className="error-text">Error adding friend</span>
        )}
      </div>
    </div>
  );
}

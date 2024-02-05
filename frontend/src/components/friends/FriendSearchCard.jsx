import React from "react";

export default function FriendCard(props) {
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
    fetch(`/api/users/${props.logInUser}/friends/${props.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error adding friend", error);
      });
  }
  return (
    <div className="add-friend-card">
      <span className="friend-card--name">{props.friendName}</span>
      {isFriend ? null : <button onClick={handleClick}>Add</button>}
    </div>
  );
}

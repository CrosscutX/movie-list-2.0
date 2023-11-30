import React from "react";

export default function FriendCard(props) {
  function handleClick() {
    console.log(props);
    fetch(`/api/users/${props.logInUser}/friends/${props.id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding friend", error);
      });
  }
  return (
    <div className="friend-card">
      <span className="friend-card--name">{props.friendName}</span>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

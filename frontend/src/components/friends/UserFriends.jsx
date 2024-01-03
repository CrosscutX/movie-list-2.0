import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserFriendCard(props) {
  const navigate = useNavigate();
  let friend_friends = props.friends;
  let userId = props.logInUser;
  let sentFromUser = false;

  function handleClick() {}

  friend_friends.map((friend) => {
    if (friend._id == userId) {
      if (friend.sentFrom == userId) {
        sentFromUser = true;
      }
    }
  });

  return (
    <div className="user-friend-card">
      <span
        onClick={() => {
          navigate(`/friends/${props.friendName}/${props.id}`);
        }}
        className="user-friend-card--name"
      >
        {props.friendName}
      </span>
      {!sentFromUser ? (
        <button onClick={handleClick}>+</button>
      ) : (
        <span>Pending</span>
      )}
    </div>
  );
}

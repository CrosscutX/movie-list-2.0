import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserFriendCard(props) {
  const navigate = useNavigate();
  let friend_friends = props.friends;
  let userId = props.logInUser;
  let sentFromUser = false;

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
          navigate(`/friends/${props.friendName}`);
        }}
        className="user-friend-card--name"
      >
        {props.friendName}
      </span>
      {!sentFromUser ? <button>+</button> : <span>Pending</span>}
    </div>
  );
}

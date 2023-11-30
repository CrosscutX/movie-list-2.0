import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserFriendCard(props) {
  const navigate = useNavigate();

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
      <button>+</button>
    </div>
  );
}

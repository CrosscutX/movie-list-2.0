import React from "react";

export default function UserFriendCard(props) {
  return (
    <div className="user-friend-card">
      <span className="user-friend-card--name">{props.friendName}</span>
      <button>+</button>
    </div>
  );
}

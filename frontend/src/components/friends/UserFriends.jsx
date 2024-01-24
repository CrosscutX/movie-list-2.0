import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserFriendCard(props) {
  const navigate = useNavigate();
  let friend_friends = props.friends;
  let userId = props.logInUser;
  let sentFromUser = false;
  let accepted = false;

  function handleClick() {
    fetch(`/api/users/${props.user.id}/friends/${props.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${props.user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Friends request failed");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  friend_friends.map((friend) => {
    if (friend._id == userId) {
      if (friend.accepted == true) {
        accepted = true;
      }
      if (friend.sentFrom == userId) {
        sentFromUser = true;
      }
    }
  });

  function checkIsFriend() {
    navigate(`/friends/${props.friendName}/${props.id}`);
  }

  return (
    <div className="user-friend-card">
      <span onClick={checkIsFriend} className="user-friend-card--name">
        {props.friendName}
      </span>
      {accepted ? null : !sentFromUser ? (
        <button onClick={handleClick}>+</button>
      ) : (
        <span>Pending</span>
      )}
    </div>
  );
}

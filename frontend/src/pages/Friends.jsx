import { useState } from "react";
import "../styles/Friends.css";

export default function Friends() {
  const [display, setDisplay] = useState("friends");
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
            <h2>Username</h2>
            <div className="friends-list">
              <input type="text" placeholder="Search Friends" />
              <span>Friend 1</span>
              <span>Friend 2</span>
              <span>Friend 3</span>
              <span>Friend 4</span>
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
            />
          </div>
        </div>
      )}
    </div>
  );
}

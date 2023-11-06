import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import "../styles/Components.css";

export default function Header() {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="header">
      <div className="header-container">
        <Link to="/search">Search</Link>
        <Link to="/list">My List</Link>
        <Link to="/friends">Friends</Link>
        <button onClick={handleClick}>Log Out</button>
      </div>
    </div>
  );
}

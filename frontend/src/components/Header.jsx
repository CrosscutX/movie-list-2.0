import React from "react";
import { Link } from "react-router-dom";
import "../styles/Components.css";
export default function Header() {
  return (
    <div className="header">
      <div className="header-container">
        <Link to="/">Search</Link>
        <Link to="/list">My List</Link>
        <Link to="/friends">Friends</Link>
      </div>
    </div>
  );
}

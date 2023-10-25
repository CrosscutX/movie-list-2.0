import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/Home.css";

export default function Home() {
  return (
    <nav className="home">
      <div className="home-container">
        <h1>The List 2.0</h1>
        <SearchBar />
      </div>
    </nav>
  );
}

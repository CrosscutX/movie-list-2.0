import React from "react";
import SearchMovie from "../components/search/SearchMovie";
import "../styles/Search.css";

export default function SearchResult(props) {
  return (
    <div className="search-result">
      <div className="search-header">
        <h1>Showing Results for: (Movie Title)</h1>
      </div>
      <div className="search-result-container">
        <SearchMovie />
        <SearchMovie />
        <SearchMovie />
        <SearchMovie />
        <SearchMovie />
        <SearchMovie />
      </div>
    </div>
  );
}

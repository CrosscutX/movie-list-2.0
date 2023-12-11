import { useEffect, useState } from "react";
import SearchMovie from "../components/search/SearchMovie";
import "../styles/Search.css";

export default function SearchResult(props) {
  const [movieTitle, setMovieTitle] = useState();
  const [extendedSearchList, setExtendedSearchList] = useState();
  useEffect(() => {
    // Get the end of the url and set it to state
    const pathSegments = window.location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    setMovieTitle(lastSegment);
  });

  useEffect(() => {
    const fetchMoviesList = async () => {
      if (movieTitle) {
        const response = await fetch(`/api/searchExtended/${movieTitle}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        let movies = await response.json();
        console.log(movies);
      }
    };
    fetchMoviesList();
  }, [movieTitle]);
  return (
    <div className="search-result">
      <div className="search-header">
        <h1>Showing Results for: {movieTitle}</h1>
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

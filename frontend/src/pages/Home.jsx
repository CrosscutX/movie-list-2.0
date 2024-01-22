import { useState, useEffect } from "react";
import HomeSearchBar from "../components/search/HomeSearchBar";
import MovieInfo from "../components/movieInfo";
import "../styles/Home.css";

export default function Home(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState();

  //handles clicking off of the movie-info panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const infoElement = document.querySelector(".movie-info");
      if (!infoElement) {
        return;
      }
      if (!infoElement.contains(e.target)) {
        e.stopPropagation();
        props.setShowInfo(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="home">
      <div className="home-container">
        <h1>The List 2.0</h1>
        {props.showInfo && (
          <MovieInfo
            showInfo={props.showInfo}
            setShowInfo={props.setShowInfo}
            selectedMovie={props.selectedMovie}
            displayType={props.displayType}
          />
        )}
        <HomeSearchBar
          searchDropdown={searchDropdown}
          setSearchDropdown={setSearchDropdown}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchText={props.searchText}
          setSearchText={props.setSearchText}
          showInfo={props.showInfo}
          setShowInfo={props.setShowInfo}
          selectedMovie={props.selectedMovie}
          setSelectedMovie={props.setSelectedMovie}
          displayType={props.displayType}
          setDisplayType={props.setDisplayType}
          user={props.user}
        />
      </div>
    </nav>
  );
}

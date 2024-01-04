import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeSearchMovie from "./HomeSearchMovie";
import searchIcon from "../../images/search-icon-white.png";
import "../../styles/SearchBar.css";

export default function HomeSearchBar(props) {
  const [displayResults, setDisplayResults] = useState();
  const navigate = useNavigate();
  //Clears out the textbox after a user goes to a different page and comes back
  useEffect(() => {
    props.setSearchText();
  }, []);

  useEffect(() => {
    if (props.searchText !== undefined) {
      let timer = setTimeout(() => {
        async function callSearchApi(movie) {
          const response = await fetch(`/api/search/${movie}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${props.user.token}`,
            },
          });
          const movieResults = await response.json();
          props.setSearchResults(movieResults);
        }
        callSearchApi(props.searchText);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [props.searchText]);

  useEffect(() => {
    if (props.searchResults) {
      const movies = props.searchResults.map((movie) => {
        return (
          <HomeSearchMovie
            key={movie.imdbID}
            movie={movie}
            title={movie.Title}
            showInfo={props.showInfo}
            setShowInfo={props.setShowInfo}
            setSelectedMovie={props.setSelectedMovie}
            setDisplayType={props.setDisplayType}
            user={props.user}
          />
        );
      });
      setDisplayResults(movies);
    }
  }, [props.searchResults, props.showInfo]);

  return (
    <div className="home-searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter movie name..."
          className="searchbar-input"
          id="movie-search"
          onChange={() => {
            //displays the dropdown when the input box has a value
            const input = document.getElementById("movie-search").value;

            if (input.length === 0) {
              props.setSearchDropdown(false);
              //Fixes a display issue, empties the dropdown when we hit 0 display results
              setDisplayResults();
            } else {
              props.setSearchDropdown(true);
              props.setSearchText(input);
            }
          }}
          onKeyDown={(e) => {
            const input = document.getElementById("movie-search").value;
            if (e.key === "Enter") {
              if (input.length !== 0) {
                navigate(`/search/${input}`);
              }
            }
          }}
        />
        <img
          src={searchIcon}
          alt="Search Icon"
          className="search-icon"
          onClick={() => {
            const input = document.getElementById("movie-search").value;
            if (input.length !== 0) {
              navigate(`/search/${input}`);
            }
          }}
        />
      </div>
      {props.searchDropdown && (
        <div className="drop-down">{displayResults}</div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import SearchMovie from "../components/search/SearchMovie";
import MovieInfo from "../components/movieInfo";
import "../styles/Search.css";

export default function SearchResult(props) {
  const [movieTitle, setMovieTitle] = useState();
  const [extendedSearchList, setExtendedSearchList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const navigate = useNavigate();
  const { logout } = useLogout();
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

  useEffect(() => {
    // Get the end of the url and set it to state
    const pathSegments = window.location.pathname.split("/");
    let lastSegment = pathSegments[pathSegments.length - 1];
    lastSegment = decodeURIComponent(lastSegment);
    setMovieTitle(lastSegment);
  });

  useEffect(() => {
    const fetchMoviesList = async () => {
      if (movieTitle) {
        const response = await fetch(`/api/searchExtended/${movieTitle}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.token}`,
          },
        });
        if (response.status === 401) {
          logout();
          navigate("/login");
        } else {
          let movies = await response.json();

          const displayMovies = movies.map((movie) => {
            return (
              <SearchMovie
                key={movie.imdbID}
                movie={movie}
                title={movie.title}
                score={movie.score}
                image={movie.image}
                showInfo={props.showInfo}
                setShowInfo={props.setShowInfo}
                setSelectedMovie={props.setSelectedMovie}
                setDisplayType={props.setDisplayType}
              />
            );
          });
          setExtendedSearchList(displayMovies);
          // Sets the loading to false to get rid of the loading text
          setIsLoading(false);
        }
      }
    };
    fetchMoviesList();
  }, [movieTitle, props.showInfo]);
  // Gives the basic loading effect as movies are being added.
  if (isLoading) {
    setTimeout(() => {
      if (loadingText === "Loading") {
        setLoadingText("Loading.");
      } else if (loadingText === "Loading.") {
        setLoadingText("Loading..");
      } else if (loadingText === "Loading..") {
        setLoadingText("Loading...");
      } else if (loadingText === "Loading...") {
        setLoadingText("Loading");
      }
    }, 500);
  }

  return (
    <div className="search-result">
      <div className="search-header">
        {props.showInfo && (
          <MovieInfo
            showInfo={props.showInfo}
            setShowInfo={props.setShowInfo}
            selectedMovie={props.selectedMovie}
            displayType={props.displayType}
            user={props.user}
          />
        )}
        <h1>Showing Results for: {movieTitle}</h1>
      </div>
      {isLoading === true && (
        <div className="loading-container">{loadingText}</div>
      )}
      {isLoading === false && (
        <div className="search-result-container">{extendedSearchList}</div>
      )}
    </div>
  );
}

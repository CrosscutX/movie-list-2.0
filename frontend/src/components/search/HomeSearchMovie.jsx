import { useEffect, useState } from "react";
import searchIcon from "../../images/search-icon-white.png";

export default function HomeSearchMovie(props) {
  const [movieObject, setMovieObject] = useState();
  const [e, setE] = useState();
  // tbh I forget why I did this but it works so lol
  useEffect(() => {
    const handleClick = () => {
      if (movieObject) {
        e.stopPropagation();
        props.setSelectedMovie(movieObject);
        props.setDisplayType("search");
      }
    };
    handleClick();
  }, [movieObject]);

  return (
    <div
      className="home-search-movie"
      onClick={async (e, id) => {
        id = props.movie.imdbID;
        const response = await fetch(`/api/searchOne/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const movieResult = await response.json();
        setMovieObject(movieResult);
        setE(e);
        if (props.showInfo === true) {
          props.setShowInfo(false);
        } else {
          props.setShowInfo(true);
        }
      }}
    >
      <div className="drop-down-row">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="search-icon-dropdown"
        />
        <span className="search-movie-title">{props.title}</span>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import searchIcon from "../../images/search-icon-white.png";

export default function HomeSearchMovie(props) {
  const [movieObject, setMovieObject] = useState();
  const [e, setE] = useState();

  useEffect(() => {
    const handleClick = () => {
      if (movieObject) {
        e.stopPropagation();
        console.log(movieObject);
        props.setSelectedMovie(movieObject);
        props.setDisplayType("search");
        if (props.showInfo === true) {
          props.setShowInfo(false);
        } else {
          props.setShowInfo(true);
        }
      }
    };
    handleClick();
  }, [movieObject]);
  return (
    <div
      className="home-search-movie"
      onClick={async (e, id) => {
        console.log(e);
        id = props.movie.imdbID;
        const response = await fetch(`/api/searchOne/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const movieResult = await response.json();
        setMovieObject(movieResult);
        setE(e);
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

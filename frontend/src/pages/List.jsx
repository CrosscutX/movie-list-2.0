import { useState, useEffect } from "react";
import ListSelector from "../components/list/ListSelector";
import ListFilter from "../components/list/ListFilter";
import ListMovies from "../components/list/ListMovies";
import MovieInfo from "../components/movieInfo";
import "../styles/Components.css";
import "../styles/List.css";

export default function List(props) {
  const [selectedOption, setSelectedOption] = useState("none");

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

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="list">
      {props.showInfo && <MovieInfo setShowInfo={props.setShowInfo} />}
      <div className="list-container">
        <h1>Your Lists</h1>
        <ListSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ListFilter />
        <ListMovies setShowInfo={props.setShowInfo} showInfo={props.showInfo} />
      </div>
    </div>
  );
}

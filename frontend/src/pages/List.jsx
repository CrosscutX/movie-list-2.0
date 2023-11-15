import { useState, useEffect } from "react";
import ListSelector from "../components/list/ListSelector";
import ListFilter from "../components/list/ListFilter";
import ListMovies from "../components/list/ListMovies";
import MovieInfo from "../components/movieInfo";
import "../styles/Components.css";
import "../styles/List.css";

export default function List() {
  const [selectedOption, setSelectedOption] = useState("none");
  const [showInfo, setShowInfo] = useState(false);
  //handles clicking off of the movie-info panel
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const infoElement = document.querySelector(".movie-info");
      console.log(infoElement);
      if (!infoElement) {
        return;
      }

      if (!infoElement.contains(e.target)) {
        e.stopPropagation();
        setShowInfo(false);
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
      {showInfo && <MovieInfo setShowInfo={setShowInfo} />}
      <div className="list-container">
        <h1>Your Lists</h1>
        <ListSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ListFilter />
        <ListMovies setShowInfo={setShowInfo} showInfo={showInfo} />
      </div>
    </div>
  );
}

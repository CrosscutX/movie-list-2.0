import { useState } from "react";
import ListSelector from "../components/list/ListSelector";
import ListFilter from "../components/list/ListFilter";
import ListMovies from "../components/list/ListMovies";
import "../styles/List.css";

export default function List() {
  const [selectedOption, setSelectedOption] = useState("none");
  return (
    <div className="list">
      <div className="list-container">
        <h1>Your Lists</h1>
        <ListSelector
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ListFilter />
        <ListMovies />
      </div>
    </div>
  );
}

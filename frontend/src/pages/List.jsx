import React from "react";
import ListSelector from "../components/ListSelector";
import ListFilter from "../components/ListFilter";
import "../styles/List.css";

export default function List() {
  return (
    <div className="list">
      <div className="list-container">
        <h1>Your Lists</h1>
        <ListSelector />
        <ListFilter />
      </div>
    </div>
  );
}

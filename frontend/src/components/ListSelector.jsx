import { useState } from "react";
import "../styles/List.css";

export default function ListSelector() {
  const [selectedOption, setSelectedOption] = useState("none");
  console.log(selectedOption);
  return (
    <div className="list-selector">
      <h2>List Selector</h2>
      <div className="list-selector-container">
        {selectedOption === "none" && (
          <div className="default-container">
            <span
              className="list-selector-selection list-button"
              onClick={() => {
                setSelectedOption("create");
              }}
            >
              Create New
            </span>
            <span
              className="list-selector-selection list-button"
              onClick={() => {
                setSelectedOption("select");
              }}
            >
              Select Lists
            </span>
          </div>
        )}
        {selectedOption === "create" && (
          <div className="create-container">
            <input
              type="text"
              id="list"
              name="list"
              className="list-input"
              placeholder="Enter a new list..."
            />
            <div className="list-button">Create</div>
          </div>
        )}
        {selectedOption === "select" && (
          <div className="select-container">
            <div className="list-button">List 1</div>
            <div className="list-button">List 2</div>
            <div className="list-button">List 3</div>
          </div>
        )}
      </div>
      <div
        className="list-button return-button"
        onClick={() => {
          setSelectedOption("none");
        }}
      >
        Return
      </div>
    </div>
  );
}

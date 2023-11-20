import "../../styles/List.css";

export default function ListSelector(props) {
  return (
    <div className="list-selector">
      <h2>List Selector</h2>
      <div className="list-selector-container">
        {props.selectedOption === "none" && (
          <div className="default-container">
            <span
              className="list-selector-selection list-button"
              onClick={() => {
                props.setSelectedOption("create");
              }}
            >
              Create New
            </span>
            <span
              className="list-selector-selection list-button"
              onClick={() => {
                props.setSelectedOption("select");
              }}
            >
              Select Lists
            </span>
          </div>
        )}
        {props.selectedOption === "create" && (
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
        {props.selectedOption === "select" && (
          <div className="select-container">
            <div className="select-list-row">
              <select
                name="list"
                id="list"
                className="list-button list-filter-button"
                defaultValue="Select List..."
              >
                <option disabled>Select List...</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="edit-row">
              <div className="list-button">Edit</div>
            </div>
          </div>
        )}
      </div>
      <div
        className="list-button return-button"
        onClick={() => {
          props.setSelectedOption("none");
        }}
      >
        Return
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function ListSelector(props) {
  const [listOfLists, setListOfLists] = useState();
  const [selectedListTitle, setSelectedListTitle] = useState("Select List...");
  useEffect(() => {
    const fetchListData = async () => {
      if (props.userLists !== undefined) {
        const lists = await Promise.all(
          props.userLists.map(async (id) => {
            const response = await fetch(`/api/movies/${id}`);
            const listInfo = await response.json();
            let listName = listInfo.listName;
            let listId = listInfo._id;
            if (listName === "all") {
              listName = "All";
            }

            return (
              <option key={listId} value={listName} data={listId}>
                {listName}
              </option>
            );
          })
        );
        setListOfLists(lists);
      }
    };
    fetchListData();
  }, [props.userLists]);

  //onChange function for list select
  function optionSelect(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionText = e.target.options[selectedIndex].text;
    const selectedOptionId =
      e.target.options[selectedIndex].getAttribute("data");
    props.setSelectedUserList(selectedOptionId);
    setSelectedListTitle(selectedOptionText);
  }

  async function addList(listname) {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    // Null error handling
    if (listname === "") {
      return;
    }

    await fetch(`/api/lists/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listName: listname,
      }),
    });
  }

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
            <div
              className="list-button"
              onClick={() => {
                const listTitle = document.querySelector(".list-input").value;
                addList(listTitle);
                props.setSelectedOption("none");
              }}
            >
              Create
            </div>
          </div>
        )}
        {props.selectedOption === "select" && (
          <div className="select-container">
            <div className="select-list-row">
              <select
                name="list"
                id="list"
                className="list-button list-filter-button list-select"
                defaultValue={selectedListTitle}
                onChange={optionSelect}
              >
                <option disabled>Select List...</option>
                {listOfLists}
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

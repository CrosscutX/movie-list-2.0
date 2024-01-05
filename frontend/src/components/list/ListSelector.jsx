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
  console.log(props.userLists);

  async function deleteList() {
    const userID = JSON.parse(localStorage.getItem("user")).id;
    console.log(userID);
    console.log(props.selectedUserList);
    try {
      const response = await fetch(`/api/lists/${userID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listID: props.selectedUserList,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  async function changeName(name) {
    const userID = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await fetch(`/api/lists/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listID: props.selectedUserList,
          nameChange: name,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
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
              <div
                className="list-button"
                onClick={() => {
                  // Error handling for user clicking on default list item or all
                  const list = document.querySelector("#list").value;
                  if (list === "Select List..." || list === "All") {
                    return;
                  }

                  props.setSelectedOption("edit");
                }}
              >
                Edit
              </div>
            </div>
          </div>
        )}
        {props.selectedOption === "edit" && (
          <div className="edit-container">
            <h2>{selectedListTitle}</h2>
            <div className="rename-row">
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
                  const name = document.querySelector(".list-input").value;
                  changeName(name);
                  props.setSelectedOption("select");
                }}
              >
                Rename
              </div>
            </div>
            <div className="shared-row">
              <button
                type="button"
                className="delete-button"
                onClick={() => {
                  deleteList();
                  props.setSelectedOption("select");
                  props.setSelectedUserList(props.userLists[0]);
                }}
              >
                Delete
              </button>
              <div className="shared-container">
                <input
                  type="checkbox"
                  id="shared"
                  className="shared-checkbox"
                />
                <label htmlFor="shared">Shared</label>
              </div>
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

import React from "react";

import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function friendListSelector(props) {
  const [listOfLists, setListOfLists] = useState();
  const [selectedListTitle, setSelectedListTitle] = useState("Select List...");
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const fetchListData = async () => {
      if (props.userLists !== undefined) {
        const lists = await Promise.all(
          props.userLists.map(async (id) => {
            const response = await fetch(
              `https://movie-list-2-0-backend.onrender.com/api/movies/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${props.user.token}`,
                },
              }
            );
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

  useEffect(() => {
    async function getPublicValue() {
      try {
        const response = await fetch(
          `https://movie-list-2-0-backend.onrender.com/api/movies/${props.selectedUserList}`,
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        );
        let publicBoolean = await response.json();
        publicBoolean = publicBoolean.public;

        setShared(publicBoolean);
      } catch (error) {
        console.error("Error getting public value:", error);
      }
    }
    if (props.selectedUserList) {
      getPublicValue();
    }
  }, [props.selectedUserList]);
  //onChange function for list select
  function optionSelect(e) {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionText = e.target.options[selectedIndex].text;
    const selectedOptionId =
      e.target.options[selectedIndex].getAttribute("data");
    props.setSelectedUserList(selectedOptionId);
    setSelectedListTitle(selectedOptionText);
  }

  async function addList() {
    try {
      const response = await fetch(
        `https://movie-list-2-0-backend.onrender.com/api/lists/${props.selectedUserList}/friends/${props.friendID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      const result = await response.json();
    } catch (e) {
      console.log("Couldn't add list" + e);
    }
  }

  return (
    <div className="select-container">
      <div className="friends list-selector-container">
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
        {shared && (
          <div className="list-button" onClick={addList}>
            Add To My List
          </div>
        )}
      </div>
    </div>
  );
}

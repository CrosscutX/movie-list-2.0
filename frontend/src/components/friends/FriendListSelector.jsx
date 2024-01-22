import React from "react";

import { useEffect, useState } from "react";
import "../../styles/List.css";

export default function friendListSelector(props) {
  const [listOfLists, setListOfLists] = useState();
  const [selectedListTitle, setSelectedListTitle] = useState("Select List...");

  useEffect(() => {
    const fetchListData = async () => {
      if (props.userLists !== undefined) {
        const lists = await Promise.all(
          props.userLists.map(async (id) => {
            const response = await fetch(`/api/movies/${id}`, {
              headers: {
                Authorization: `Bearer ${props.user.token}`,
              },
            });
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

  return (
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
    </div>
  );
}

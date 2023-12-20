import React from "react";

export default function SelectMovieListItem(props) {
  console.log(props.list);
  return (
    <div className="list-item">
      <label htmlFor="">{props.list.listName}</label>
      <input type="checkbox" />
    </div>
  );
}

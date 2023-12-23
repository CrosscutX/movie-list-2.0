import { useEffect, useState } from "react";

export default function SelectMovieListItem(props) {
  console.log(props.list);
  const [allCheck, setAllCheck] = useState(true);

  useEffect(() => {
    if (props.list.listName === "all") {
      setAllCheck(false);
    }
  }, []);

  return (
    <div className="list-item">
      {allCheck && (
        <div className="list-item-container">
          <label htmlFor={props.list.listName}>{props.list.listName}</label>
          <input type="checkbox" id={props.list.listName} />
        </div>
      )}
    </div>
  );
}

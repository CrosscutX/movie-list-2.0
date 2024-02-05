import { useEffect, useState } from "react";
import SelectMovieListItem from "./SelectMovieListItem";
export default function SelectMovieList(props) {
  const [listOfLists, setListOfLists] = useState();
  useEffect(() => {
    async function fetchLists() {
      if (props.lists) {
        const lists = await Promise.all(
          props.lists.map(async (id) => {
            const response = await fetch(`/api/movies/${id}`, {
              headers: {
                Authorization: `Bearer ${props.user.token}`,
              },
            });
            const listInfo = await response.json();
            console.log(listInfo);
            return (
              <SelectMovieListItem
                key={listInfo._id}
                list={listInfo}
                selectedMovie={props.selectedMovie}
                user={props.user}
                selectedUserList={props.selectedUserList}
                filteredMovieList={props.filteredMovieList}
                setFilteredMovieList={props.setFilteredMovieList}
              />
            );
          })
        );
        setListOfLists(lists);
      }
    }
    fetchLists();
  }, []);

  return (
    <div className="select-movie-list">
      <h2>{props.title}</h2>
      <h3>Lists</h3>
      <div className="select-movie-list-items">{listOfLists}</div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          props.setDisplaySelectMovieList(false);
          props.setShowInfo(true);
        }}
      >
        Return
      </button>
    </div>
  );
}

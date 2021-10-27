import React from "react";
import { useNotes } from "../../hooks/useNotes";
import { useStore } from "effector-react";
import { appStore } from "../../App.model";

export const Notes = ({
  scrollRef,
  searchValue,
  onSearchByTagInitializaion,
}) => {
  const $appStore = useStore(appStore);
  const notes = useNotes($appStore.notes); // преобразование заметок в react элементы

  return (
    <div className="notes">
      <div className="notes__top-wrapper">
        <h2 className="notes__title">Notes</h2>
        <input
          onChange={(e) => onSearchByTagInitializaion(e)}
          value={searchValue}
          type="text"
          placeholder={"Search by tags"}
          className="notes__search"
        />
      </div>
      <ul className="notes__list" ref={scrollRef}>
        {notes}
      </ul>
    </div>
  );
};

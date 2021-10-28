import React, { useRef } from "react";
import { useNotes } from "../../hooks/useNotes";
import { useStore } from "effector-react";
import { appStore, emptyContentSwitcher } from "../../App.model";

export const Notes = ({
  searchValue,
  onSearchByTagInitializaion,
  scrollHandler
}) => {
  const $appStore = useStore(appStore);
  const notes = useNotes($appStore.notes); // преобразование заметок в react элементы
  const scrollRef = useRef(null); // референс на блок с заметками

  return (
    <div className="notes">
      <div className="notes__top-wrapper">
        <h2 className="notes__title">Notes <button onClick={emptyContentSwitcher} className="notes__create-note">+</button></h2>
        <input
          onChange={(e) => onSearchByTagInitializaion(e)}
          value={searchValue}
          type="text"
          placeholder={"Filter by tag"}
          className="notes__search"
        />

      </div>
      <ul className="notes__list" onScroll={scrollHandler} ref={scrollRef}>
        {notes}
      </ul>
    </div>
  );
};

import React from "react";
import delete_icon from "../../../assets/images/delete-icon.png";
import { deleteNote, openNote } from "../../../App.model";

export const NoteItem = ({ name, id }) => {
  return (
    <div className="note-item-wrapper">
      <li onClick={() => openNote({ id })} className="notes__list-item">
        {name}
      </li>
      <button
        onClick={() => deleteNote({ id })}
        className="notes__list-item-delete"
      >
        <img src={delete_icon} alt="deleteIcon" />
      </button>
    </div>
  );
};

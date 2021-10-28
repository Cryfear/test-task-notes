import React from 'react';
import { appStore } from "../../../App.model";
import { CreatingNote } from "./CreatingNote/CreatingNote";
import { EditingNote } from "./EditingNote/EditingNote";
import { useStore } from "effector-react";

export const NoteContent = () => {
  const isCreatingNote = useStore(appStore).isCreatingNote;

  return isCreatingNote ? <CreatingNote /> : <EditingNote />
}
import React, { useMemo } from "react";
import { NoteItem } from "../components/Notes/NoteItem/NoteItem";

export const useNotes = (notes) =>
  useMemo(() => {
    return notes.map((item) => {
      return <NoteItem {...item} key={item.id} />;
    });
  }, [notes]);

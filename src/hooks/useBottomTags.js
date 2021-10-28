import React from 'react';
import { Tag } from "../components/Content/NoteContent/Tag/Tag";

export const useBottomTags = ({tags, noteId, setTags, noteName, textAreaValue, setTextAreaValue, generatorRef}) => {
  return tags && tags.length > 0 ? tags.map((tag, index) => {
    return <Tag
      setTags={setTags}
      allTags={tags}
      key={index}
      tag={tag}
      noteId={noteId}
      noteName={noteName}
      textAreaValue={textAreaValue}
      setTextAreaValue={setTextAreaValue}
      generatorRef={generatorRef}
    />
  }) : null;
}
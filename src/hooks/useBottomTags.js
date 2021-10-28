import React, { useMemo } from 'react';
import { Tag } from "../components/Content/NoteContent/Tag/Tag";

export const useBottomTags = ({tags, setTags, textAreaValue, setTextAreaValue, generatorRef}) => {
  return useMemo(() => {
    return tags && tags.length > 0 ? tags.map((tag, index) => {
      return <Tag
        setTags={setTags}
        allTags={tags}
        key={index}
        tag={tag}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        generatorRef={generatorRef}
      />
    }) : null;
  }, [tags, setTags, textAreaValue, setTextAreaValue, generatorRef])

}
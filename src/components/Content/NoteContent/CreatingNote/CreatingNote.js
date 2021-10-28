import React, { useEffect, useRef, useState } from 'react';
import { addNote } from "../../../../App.model";
import { HighlightTags } from "../../../../utils/HighlightTags";
import { useBottomTags } from "../../../../hooks/useBottomTags";
import { NoteContentTemplate } from "../NoteContentTemplate/NoteContentTemplate";

export const CreatingNote = () => {
  const generatorRef = useRef(null);

  const [noteNameValue, setNoteNameValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tags, setTags] = useState([]);
  const [addTagValue, setAddTagValue] = useState('');

  useEffect(() => {
    generatorRef.current.innerText = '';
    // при измении значения в textarea генерировать текст в div
    HighlightTags(generatorRef, textAreaValue);
  }, [textAreaValue])


  const bottomTags = useBottomTags({
    tags,
    setTags,
    textAreaValue,
    setTextAreaValue,
    generatorRef
  }); // создаем реакт элементы тегов под текстареей

  const Handlers = {
    onAddNoteHandler: () => {
      return addNote({
        name: noteNameValue,
        content: textAreaValue,
        tags,
      })
    },

    onAddTagHandler: () => {
      if (addTagValue.length > 0) {
        setTags(Array.from(new Set([...tags, addTagValue])));
        setTextAreaValue(textAreaValue + (tags.length > 0 ? ' #' : '#') + addTagValue);
      }
    },

    onChangeAddTagHandler: (e) => setAddTagValue(e.currentTarget.value.replace(/\s|#/g, '')),
    onScrollTextareaHandler: (e) => generatorRef.current.scrollTop = e.target.scrollTop,
  }

  return (
    <div className="content">
      <NoteContentTemplate
        noteNameValue={noteNameValue}
        setNoteNameValue={setNoteNameValue}
        Handlers={Handlers}
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        setTags={setTags}
        generatorRef={generatorRef}
        bottomTags={bottomTags}
        addTagValue={addTagValue}
      />
      <button onClick={Handlers.onAddNoteHandler} className="content__btn">Add note</button>
    </div>
  )
}
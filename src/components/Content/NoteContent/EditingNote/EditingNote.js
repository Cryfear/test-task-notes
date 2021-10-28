import React, { useEffect, useRef, useState } from 'react';
import { useStore } from "effector-react";
import { appStore, deleteNote, updateNote } from "../../../../App.model";
import { useBottomTags } from "../../../../hooks/useBottomTags";
import { HighlightTags } from "../../../../utils/HighlightTags";
import { NoteContentTemplate } from "../NoteContentTemplate/NoteContentTemplate";

export const EditingNote = () => {
  const Note = useStore(appStore).openedNote;
  const generatorRef = useRef(null);

  useEffect(() => {
    setNoteNameValue(Note.name);
    setTextAreaValue(Note.content);
    setTags(Note.tags);
  }, [Note]) // init

  const [noteNameValue, setNoteNameValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tags, setTags] = useState('');
  const [addTagValue, setAddTagValue] = useState('');

  useEffect(() => {
    generatorRef.current.innerText = Note.content;
    // при измении значения в textarea генерировать текст в div
    HighlightTags(generatorRef, textAreaValue);
  }, [Note, textAreaValue])

  const bottomTags = useBottomTags({
    tags,
    noteId: Note.id,
    setTags,
    noteName: noteNameValue,
    textAreaValue,
    setTextAreaValue,
    generatorRef
  });

  const Handlers = {
    onAddTagHandler: () => {
      if (addTagValue.length > 0) {
        setTags(Array.from(new Set([...tags, addTagValue])));
        setTextAreaValue(textAreaValue + (tags.length > 0 ? ' #' : '#') + addTagValue);
      }
    },

    updateNoteHandler: () => {
      const content = textAreaValue.replace(/\s+/g, ' ').trim()

      setTextAreaValue(content);

      return updateNote({
        id: Note.id,
        changes: {name: noteNameValue, content, tags}
      })
    },

    onChangeAddTagHandler: (e) => setAddTagValue(e.currentTarget.value.replace(/\s|#/g, '')),
    onScrollTextareaHandler: (e) => generatorRef.current.scrollTop = e.target.scrollTop,
    onDeleteNote: () => deleteNote({id: Note.id})
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
        addTagValue={addTagValue}/>
      <button
        onClick={Handlers.onDeleteNote}
        className="content__btn content__btn-delete">
        Delete note
      </button>
      <button onClick={Handlers.updateNoteHandler} className="content__btn content__btn-update">
        Update note
      </button>
    </div>
  );
}
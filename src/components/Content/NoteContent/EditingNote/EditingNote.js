import React, { useEffect, useRef, useState } from 'react';
import { useStore } from "effector-react";
import { appStore, deleteNote, updateNote } from "../../../../App.model";
import { textareaOnChange } from "../../../../utils/textareaOnChange";
import { useBottomTags } from "../../../../hooks/useBottomTags";
import { HighlightTags } from "../../../../utils/HighlightTags";

export const EditingNote = () => {
  const Note = useStore(appStore).openedNote;
  const generatorRef = useRef(null);

  useEffect(() => {
    setNoteNameValue(Note.name);
    setTextAreaValue(Note.content);
    setTags(Note.tags);
  }, [Note ])



  const [noteNameValue, setNoteNameValue] = useState(Note.name);
  const [textAreaValue, setTextAreaValue] = useState(Note.content);
  const [tags, setTags] = useState(Note.tags);
  const [addTagValue, setAddTagValue] = useState('');

  useEffect(() => {
    generatorRef.current.innerText = Note.content;
    HighlightTags(generatorRef, textAreaValue);
  }, [textAreaValue])

  const bottomTags = useBottomTags({
    tags,
    noteId: Note.id,
    setTags,
    noteName: noteNameValue,
    textAreaValue,
    setTextAreaValue,
    generatorRef
  });

  const updateNoteHandler = () => {
    const content = textAreaValue.replace(/\s+/g, ' ').trim()

    setTextAreaValue(content);

    return updateNote({
      id: Note.id,
      changes: {name: noteNameValue, content, tags}
    })
  }

  return (
    <div className="content">
      <h2 className="content__title">Content</h2>
      <input
        type="text"
        value={noteNameValue}
        onChange={(e) => setNoteNameValue(e.currentTarget.value)}
        placeholder={"Create a name for a note"} className="content__note-name"/>
      <div className="generator-wrapper">
          <textarea
            onScroll={(e) => {
              // когда мы скролим с текстареи, то в сгенерированном контенте тоже скролится
              generatorRef.current.scrollTop = e.target.scrollTop;
            }
            }
            id="note_text"
            value={textAreaValue}
            className="content__textarea"
            placeholder={'Text...'}
            onChange={(e) => textareaOnChange({e, setTextAreaValue, setTags, generatorRef})}
          />
        <div
          id={'text-generator'}
          ref={generatorRef}
          className="content__textarea-generator">
        </div>
      </div>
      <div className="content__note-tags">{bottomTags}</div>
      <div className="content__add-tag field">
        <input onChange={(e) => setAddTagValue(e.currentTarget.value)} value={addTagValue} type="input"
          className="content__add-tag-field" placeholder="Add a tag" name="add_tag" id='add_tag'/>
        <label htmlFor="add_tag" className="content__add-tag-label">Add a tag</label>
        <button onClick={() => {
          setTags(Array.from(new Set([...tags, addTagValue])));
          setTextAreaValue(textAreaValue + (tags.length > 0 ? ' #' : '#') + addTagValue);
        }} className="content__btn content__btn-tag">Add tag
        </button>
      </div>
      <button
        onClick={() => deleteNote({id: Note.id})}
        className="content__btn content__btn-delete">
        Delete note
      </button>
      <button onClick={updateNoteHandler} className="content__btn content__btn-update">
        Update note
      </button>
    </div>
  );
}
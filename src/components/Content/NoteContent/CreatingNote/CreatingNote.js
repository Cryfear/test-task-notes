import React, { useRef, useState } from 'react';
import { textareaOnChange } from "../../../../utils/textareaOnChange";
import { addNote } from "../../../../App.model";

export const CreatingNote = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [noteNameValue, setNoteNameValue] = useState('');
  const [tags, setTags] = useState('');

  const generatorRef = useRef(null);

  const bottomTags = tags.length > 0 ? "#" + tags.join(' #') : null;

  const onAddButton = () => {
    return addNote({
      name: noteNameValue,
      content: textAreaValue,
      tags,
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
            id="note_text"
            value={textAreaValue}
            className="content__textarea"
            placeholder={'Text...'}
            onChange={(e) => textareaOnChange({e, setTextAreaValue, setTags, generatorRef})}
          />
        <div
          id={'text-generator'}
          ref={generatorRef}
          contentEditable={true}
          className="content__textarea-generator">
        </div>
      </div>
      <button onClick={onAddButton} className="content__btn">Add note</button>
      <div className="content__note-tags">{bottomTags}</div>
    </div>
  )
}
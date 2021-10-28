import React from 'react';
import { textareaOnChange } from "../../../../utils/textareaOnChange";

export const NoteContentTemplate = (
  {
    noteNameValue,
    setNoteNameValue,
    Handlers,
    textAreaValue,
    setTextAreaValue,
    setTags,
    generatorRef,
    bottomTags,
    addTagValue
  }) => {
  return (
    <div>
      <h2 className="content__title">Content</h2>
      <input
        type="text"
        value={noteNameValue}
        onChange={(e) => setNoteNameValue(e.currentTarget.value)}
        placeholder={"Create a name for a note"} className="content__note-name"/>
      <div className="generator-wrapper">
          <textarea
            onScroll={(e) => Handlers.onScrollTextareaHandler(e)}
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
        <input onChange={(e) => Handlers.onChangeAddTagHandler(e)} value={addTagValue} type="input"
          className="content__add-tag-field" placeholder="Add a tag" name="add_tag" id='add_tag'/>
        <label htmlFor="add_tag" className="content__add-tag-label">Add a tag</label>
        <button onClick={Handlers.onAddTagHandler} className="content__btn content__btn-tag">
          Add tag
        </button>
      </div>
    </div>
  )
}
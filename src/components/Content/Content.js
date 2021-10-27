import React, { useState } from 'react';
import './Content.scss';
import { EmptyContent } from "./EmptyContent/EmptyContent";
import { addNote, appStore } from "../../App.model";
import hashtagRegExp from 'hashtag-regex';
import { Api as api } from "../../api/api";
import { useStore } from "effector-react";

export const Content = () => {
  const $appStore = useStore(appStore);

  const isEmpty = false;

  const [noteNameValue, setNoteNameValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [tags, setTags] = useState([]);

  const autoResize = (element) => { // auto resize typing for textarea
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }

  const textareaOnChange = (e) => {
    setTextAreaValue(e.currentTarget.value);

    const regExp = hashtagRegExp();

    const tags = e.currentTarget.value.match(regExp) || [];
    const withoutHashSymbol = tags.map((item) => {
      return item.slice(1);
    })

    // const tags = e.currentTarget.value.split(' ').filter(x => x.match(/^#[\w\dа-яА-Я]+/));

    setTags(Array.from(new Set(withoutHashSymbol)));
  }

  return isEmpty ? <EmptyContent/> : <div className="content">
    <h2 className="content__title">Content</h2>
    <input
      type="text"
      value={noteNameValue}
      onChange={(e) => setNoteNameValue(e.currentTarget.value)}
      placeholder={"Create a name for a note"} className="content__note-name"/>
    <textarea
      name="note_text"
      id="note_text"
      cols="30" rows="10"
      className="content__textarea"
      maxLength={5000}
      onInput={(e) => autoResize(e.currentTarget)}
      value={textAreaValue}
      placeholder={'Text...'}
      onChange={(e) => textareaOnChange(e)}
    />
    <button onClick={() => {
      api.addNote({
        name: noteNameValue,
        content: textAreaValue,
        tags,
        id: $appStore.notes ? $appStore.notes.length + 1 : 1
      });
      addNote({name: noteNameValue, content: textAreaValue, tags})
    }}
      className="content__add-note">
      Add note
    </button>
    <div className="content__note-tags">{tags.length > 0 ? "#" + tags.join(' #') : null}</div>
  </div>
} 
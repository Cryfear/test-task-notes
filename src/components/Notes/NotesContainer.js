import React, { useCallback, useEffect, useState } from "react";
import "./Notes.scss";
import {
  appStore, clearNotes,
  notesInitialization,
  onSearchScrollFx,
  setSearchNotesFx,
} from "../../App.model";
import { useStore } from "effector-react";
import { Notes } from "./Notes";

export const NotesContainer = () => {
  const $appStore = useStore(appStore); // состояние приложения
  const [searchValue, setSearchValue] = useState(""); // поисковая строка
  const [scrollFectching, setScrollFetching] = useState(false); // состояние загружается ли

  useEffect(() => {
    if(!$appStore.isEndSearch) notesInitialization() // инициализируем заметки
  }, [$appStore.isEndSearch]);

  useEffect(() => {
    if (scrollFectching) { // scrollFetching true ? значит нужна подгрузка.
      const value = searchValue.trim().replace(/#/g, "");
      // убираем лишние пробелы и убираем символы #, для удобного поиска

      onSearchScrollFx({searchValue: value, page: $appStore.searchPage + 1,})
      .finally(() => setScrollFetching(false));
    }
  }, [scrollFectching, $appStore.searchPage, searchValue]);

  const Handlers = {
    onSearchByTagInitializaion: useCallback((e) => {
      clearNotes(); // каждый раз, когда ищем новое значение нужно очистить заметки

      const value = e.currentTarget.value.trim();
      setSearchValue(value);

      if (value) {
        setSearchNotesFx({searchValue: value.replace(/#/g, ""), page: $appStore.searchPage});
      } else notesInitialization();
    }, [$appStore.searchPage]),

    scrollHandler: useCallback((e) => {
      const {scrollHeight, scrollTop} = e.currentTarget;
      const isEndNotes = scrollHeight - (scrollTop + (window.innerHeight - 110)) < 50;

      if (isEndNotes && !$appStore.isEndSearch) setScrollFetching(true);
    }, [$appStore.isEndSearch]),
  }

  return (
    <Notes
      onSearchByTagInitializaion={Handlers.onSearchByTagInitializaion}
      scrollHandler={Handlers.scrollHandler}
      searchValue={searchValue}
    />
  );
};

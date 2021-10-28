import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Notes.scss";
import {
  appStore,
  notesInitialization,
  onSearchScrollFx,
  setSearchNotesFx,
} from "../../App.model";
import { useStore } from "effector-react";
import { Notes } from "./Notes";

export const NotesContainer = () => {
  const $appStore = useStore(appStore); // состояние приложения
  const scrollRef = useRef(null); // референс на блок с заметками

  const [searchValue, setSearchValue] = useState(""); // поисковая строка
  const [scrollFectching, setScrollFetching] = useState(false); // состояние загружается ли

  const scrollHandler = useCallback((e) => {
    // проверка, дошел ли пользователь до конца, нужна ли подгрузка

    const { scrollHeight, scrollTop } = e.currentTarget;
    const isEndNotes = scrollHeight - (scrollTop + (window.innerHeight - 110)) < 50;

    if (isEndNotes && !$appStore.isEndSearch) setScrollFetching(true);
  }, [$appStore.isEndSearch]);

  useEffect(() => notesInitialization(), []);

  useEffect(() => {
    // этот useEffect для того, чтобы отслеживать, нужна ли подгрузка заметок

    if (scrollFectching) {
      const value = searchValue.trim().replace(/#/g, "");
      // убираем лишние пробелы и убираем символы #, для удобного поиска

      onSearchScrollFx({ searchValue: value, page: $appStore.searchPage + 1, })
        .finally(() => setScrollFetching(false));
    }
  }, [scrollFectching, $appStore.searchPage, searchValue]);

  useEffect(() => {
    const ref = scrollRef.current;
    ref.addEventListener("scroll", scrollHandler);

    return () => ref.removeEventListener("scroll", scrollHandler);
  }, [$appStore.searchPage, searchValue, scrollHandler]);

  const onSearchByTagInitializaion = useCallback((e) => {
    // убираем пробелы из поисковой строки
    const value = e.currentTarget.value.trim();
    setSearchValue(value);

    if (value) {
      setSearchNotesFx({ searchValue: value.replace(/#/g, ""), page: $appStore.searchPage });
    } else notesInitialization();
  }, [$appStore.searchPage]);

  return (
    <Notes
      onSearchByTagInitializaion={onSearchByTagInitializaion}
      scrollRef={scrollRef}
      searchValue={searchValue}
    />
  );
};

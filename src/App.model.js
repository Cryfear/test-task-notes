import { createEffect, createStore } from "effector";
import { Api } from "./api/api";

export const onSearchScrollFx = createEffect(
  // Поиск по скроллу
  async ({searchValue, page}) => {
    return await Api.getNotesByTag({searchValue, page: page + 1});
  }
);

export const setSearchNotesFx = createEffect(async ({searchValue, page}) => {
  // Отдает заметки по поиску
  return await Api.getNotesByTag({searchValue, page});
});

export const notesInitialization = createEffect(async () => {
  // Инициализация заметок
  return await Api.getNotes({page: 1}).then((data) => data);
});

export const addNote = createEffect(({name, content, tags}) => {
  // Добавление заметки
  return {name, content, tags};
});

export const deleteNote = createEffect(({id}) => {
  // Добавление заметки
  Api.deleteNote({id});

  return {id};
});

export const appStore = createStore({
  notes: [],
  searchPage: 0,
  isEndSearch: false
})
  .on(addNote.doneData, (state, item) => {
    if (state.notes.length > 0) {
      const note = {
        ...item,
        id: state.notes[state.notes.length - 1].id + 1,
      };

      return {
        ...state,
        notes: [...state.notes, {...note}],
      };
    } else if (state.notes.length < 0 && item) { // выполняется в случае, если нет ни одной заметки
      return {
        ...state,
        notes: [{...item, id: 1}],
      };
    }

    return state;
  })
  .on(deleteNote.doneData, (state, {id}) => {
    return {
      ...state,
      notes: state.notes.filter((item) => {
        return item.id !== id;
      })
    }
  })
  .on(notesInitialization.doneData, (state, notes) => {
    return {
      ...state,
      notes: [...notes],
      searchPage: state.searchPage + 1,
    };
  })
  .on(setSearchNotesFx.doneData, (state, notes) => {
    return {
      ...state,
      notes: [...notes],
    };
  })
  .on(onSearchScrollFx.doneData, (state, notes) => {
    console.log(notes);
    if (notes && notes.length > 0) {
      return {
        notes: [...state.notes, ...notes],
        searchPage: state.searchPage + 1,
      };
    }
    return {...state, isEndSearch: true};
  });

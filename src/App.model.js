import { createEffect, createStore } from "effector";
import { Api as api, Api } from "./api/api";

export const onSearchScrollFx = createEffect(
  // Поиск по скроллу
  async ({searchValue, page}) => {
    return {
      notes: await Api.getNotesByTag({searchValue, page}),
      page: page
    }
  }
);

export const setSearchNotesFx = createEffect(async ({searchValue, page}) => {
  // Отдает заметки по поиску
  return await Api.getNotesByTag({searchValue, page});
});

export const notesInitialization = createEffect(async () => {
  // Инициализация заметок
  clearNotes();
  return await Api.getNotes({page: 1}).then((data) => data);
});

export const addNote = createEffect(async ({name, content, tags}) => {
  // добавление заметки
  notesInitialization();
  return await api.addNote({name: name.length > 0 ? name : 'unnamed', content, tags});
});

export const deleteNote = createEffect(({id}) => {
  // удаление заметки
  Api.deleteNote({id});

  return {id};
});

export const updateNote = createEffect(async ({id, changes}) => {
  // обновление заметки
  Api.updateNote({id, changes}).then(() => notesInitialization());
});

export const openNote = createEffect(async ({id}) => {
  // просмотр заметки
  return await Api.getNote({id})
});

export const emptyContentSwitcher = createEffect(() => true)
export const clearNotes = createEffect(() => true)
// при открытии приложения, человек решает или создать или просмотреть заметку, это флаг пустого контента

export const appStore = createStore({
  notes: [],
  openedNote: {
    id: null,
    content: null,
    tags: [],
    name: null
  },
  searchPage: 1,
  isEndSearch: false,

  isEmptyContent: true, // there
  isCreatingNote: false, // can be
  isEditingNote: false // only one TRUE onetime
})
  .on(openNote.doneData, (state, note) => {
    if (note) {
      return {
        ...state,
        openedNote: {...note},
        isEditingNote: true,
        isEmptyContent: false,
        isCreatingNote: false
      }
    }

    return state;
  })
  .on(addNote.doneData, (state, note) => {
    if (state.notes.length > 0) {
      return {
        ...state,
        notes: [{...note}, ...state.notes],
        openedNote: {...note},
        isEditingNote: true,
        isEmptyContent: false,
        isCreatingNote: false
      };
    } else if (state.notes.length < 0 && note) { // выполняется в случае, если нет ни одной заметки
      return {
        ...state,
        notes: [{...note, id: 1}],
        openedNote: {...note},
        isEditingNote: true,
        isEmptyContent: false,
        isCreatingNote: false
      };
    }

    return state;
  })
  .on(deleteNote.doneData, (state, {id}) => {
    return {
      ...state,
      notes: state.notes.filter((item) => {
        return item.id !== id;
      }),
      openedNote: {
        id: null,
        content: null,
        tags: [],
        name: null
      },
      isEditingNote: false,
      isEmptyContent: true,
      isCreatingNote: false
    }
  })
  .on(notesInitialization.doneData, (state, notes) => {
    return {
      ...state,
      notes: [...notes],
      isEndSearch: false,
      searchPage: 1,
    };
  })
  .on(setSearchNotesFx.doneData, (state, notes) => {
    return {
      ...state,
      searchPage: 1,
      isEndSearch: false,
      notes: [...notes],
    };
  })
  .on(onSearchScrollFx.doneData, (state, {notes, page}) => {
    if (notes && notes.length > 0 && state.searchPage !== page) {
      return {
        ...state,
        notes: [...state.notes, ...notes],
        isEndSearch: false,
        searchPage: page,
      };
    }
    return {...state, isEndSearch: true};
  })
  .on(emptyContentSwitcher.done, (state) => {
    if(state.isEmptyContent) {
      return {
        ...state,
        isEmptyContent: false,
        isCreatingNote: true,
        isEditingNote: false
      }
    }
    return {
      ...state,
      isEmptyContent: false,
      isCreatingNote: true,
      isEditingNote: false
    }
  })

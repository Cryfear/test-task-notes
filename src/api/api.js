import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3004",
  withCredentials: true
});

export const Api = {
  getNotes({page}) {
    return instance
      .get(`/notes?_page=${page}&_limit=30`)
      .then((data) => data.data)
      .catch((err) => err);
  },
  addNote({id, name, tags, content}) {
    return instance
      .post("/notes", {
        id,
        name,
        tags,
        content
      })
      .then((data) => data.data)
      .catch((err) => err);
  },
  getNotesByTag({searchValue, page}) {
    return instance.get(`/notes?tags_like=${searchValue}&_page=${page}&_limit=25`)
      .then((data) => data.data)
      .catch((err) => err);
  },
  deleteNote({id}) {
    return instance.delete(`notes/${id}`) // json-server не возвращает ничего в then
      .catch((err) => err);
  }
};
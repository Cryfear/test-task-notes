import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3004",
  withCredentials: true
});

export const Api = {
  getNotes({page}) {
    return instance
      .get(`/notes?_sort=id&_order=desc&_page=${page}&_limit=30`)
      .then((data) => data.data)
      .catch((err) => err);
  },
  getNote({id}) {
    return instance
      .get(`/notes?id=${id}`)
      .then((data) => data.data[0])
      .catch((err) => err);
  },
  updateNote({id, changes}) {
    return instance.put(`/notes/${id}`, {...changes})
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
    return instance.get(`/notes?_sort=id&_order=desc&tags_like=${searchValue}&_page=${page}&_limit=25`)
      .then((data) => data.data)
      .catch((err) => err);
  },
  deleteNote({id}) {
    return instance.delete(`notes/${id}`) // json-server не возвращает ничего в then
      .catch((err) => err);
  }
};
import { updateNote } from "../App.model";
import { HighlightTags } from "./HighlightTags";

export const removeTagsHandler = ({tag, allTags, setTags, noteId, noteName, textAreaValue, setTextAreaValue, generatorRef}) => {
  const tags = allTags.filter((item) => item !== tag);

  const regexp = new RegExp(`${'#' + tag}(?=(\\s|#|$))`, 'g');
  const content = textAreaValue.replace(regexp, '').replace(/\s+/g, ' ').trim();
  // удалили все нужные хештеги

  setTags(tags);
  setTextAreaValue(content);

  HighlightTags(generatorRef, textAreaValue)

  // вносим изменения в приложении и на сервере

  return updateNote({id: noteId, changes: {tags, content, name: noteName}})
}
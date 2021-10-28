import { HighlightTags } from "./HighlightTags";

export const removeTagsHandler = ({tag, allTags, setTags, textAreaValue, setTextAreaValue, generatorRef}) => {
  const tags = allTags.filter((item) => item !== tag);
  // удаляет из массива tags все ненужные теги

  const regexp = new RegExp(`${'#' + tag}(?=(\\s|#|$))`, 'g');
  const content = textAreaValue.replace(regexp, '').replace(/\s+/g, ' ').trim();
  // удаляет из контента все теги

  setTags(tags);
  setTextAreaValue(content);

  // вносим изменения в приложении

  HighlightTags(generatorRef, textAreaValue);
}
import hashtagRegExp from "hashtag-regex";
import { HighlightTags } from "./HighlightTags";

export const regExp = hashtagRegExp();

export const textareaOnChange = ({e, setTextAreaValue, setTags, generatorRef}) => {
  generatorRef.current.innerHTML = e.currentTarget.value; // псевдо див имеет значение textarea
  setTextAreaValue(e.currentTarget.value);

  const tags = e.currentTarget.value.match(regExp) || []; // достаем теги из textarea

  const withoutHashSymbol = tags.map((item) => {
    // убираем из тегов символы #
    return item.slice(1);
  })

  HighlightTags(generatorRef, e.currentTarget.value); // обновляем подсветку

  setTags(Array.from(new Set(withoutHashSymbol))); // убираем дубликаты и устанавливаем значение для массива тегов
}
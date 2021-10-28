import { regExp } from "./textareaOnChange";

export const HighlightTags = (generatorRef, textareaValue) => {
  generatorRef.current.innerHTML =
    textareaValue.replace(regExp, `<span class="hashtag replace-it"> </span>`);

  const tags = textareaValue.match(regExp) || [];


  const elements = document.querySelectorAll('.replace-it');

  elements.forEach((item, index) => item.innerText = tags[index]);
  // вставляем теги внутрь всех span.replace-it по индексу
}
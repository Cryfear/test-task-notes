import { regExp } from "./textareaOnChange";

export const HighlightTags = (generatorRef, textareaValue) => {
  generatorRef.current.innerHTML =
    textareaValue.replace(regExp, `<span class="hashtag replace-it"> </span>`);
  // вместо тегов вставляются на их место spans

  const tags = textareaValue.match(regExp) || [];
  // достаем все теги для последующей вставки

  const elements = document.querySelectorAll('.replace-it');
  // bad practice...

  elements.forEach((item, index) => item.innerText = tags[index]);
  // вставляем хештеги внутрь всех span.replace-it
}
function createimg(image, tag, parentClass, clas, id, size) {
  let span, div;
  const img = new Image();
  size ? (size = "original") : (size = "w342");
  img.src = `https://image.tmdb.org/t/p/${size}/` + image;
  if (clas && clas != "") img.setAttribute("class", clas);
  if (tag && tag != "") {
    span = createElement("span", "type", tag);
    div = createElement("div", parentClass, [span, img], id);
  } else div = createElement("div", parentClass, img, id);
  return div;
}

function createElement(element, clas, content, id) {
  const elem = document.createElement(element);
  if (clas != "" && clas) elem.setAttribute("class", clas);
  if (id != "" && id) elem.setAttribute("id", id);
  // checks to see if a argument is assigned to this parameter
  if (content && content != "") {
    if (content.length > 1) {
      // if the content is greater than one, it will spread it
      elem.append(...content);
    } else elem.append(content);
  }
  return elem;
}

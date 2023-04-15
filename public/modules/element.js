/** CREATEIMG
 *it creates a card with an image and a tag that specifies the media type
 * @param {*} image
 *specifies the image path
 * @param {*} tag
 * specifies the media type
 * @param {*} parentClass
 * specifies the class of the parent element
 * @param {*} clas
 * specifies the class of the image element
 * @param {*} id
 * specifies the class of the parent element
 * @param {*} size
 * specifies the size of the image element
 * @return {*}
 * it returns the parent element
 */

function createimg(image, tag, parentClass, clas, id, size) {
  let span, div;
  const img = new Image();
  /* if there is an argument for the size parameter, 
  the image is given it's original size 
  else the size will be set w342*/
  size ? (size = "original") : (size = "w342");
  img.src = `https://image.tmdb.org/t/p/${size}/` + image;
  // if there  is an argument for the clas parameter and the argument is not "", execute the statement
  if (clas && clas != "") img.setAttribute("class", clas);
  if (tag && tag != "") {
    span = createElement("span", "type", tag);
    div = createElement("div", parentClass, [span, img], id);
  } else div = createElement("div", parentClass, img, id);
  return div;
}

/**
 *it creates an element with an optional id, class and child element
 *
 * @param {*} element
 * the element to be created
 * @param {*} clas
 * the class of the specified element
 * @param {*} content
 * the child element
 * @param {*} id
 * the id of the element
 * @return {*}
 * it returns the element
 */
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

// it's gets the id and the media_type of the movie and then send it to the server on click.
async function description(elem) {
  const id = elem.id;
  // it get the id as a string and then split it into an array of substring
  const array = id.split(" ");
  console.log(array);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: array[0],
      media_type: array[1],
    }),
  };
  const data = await fetch("/desc", options);
  const response = await data.json()
  console.log(response);
}

export { createimg, createElement, description };

import { createElement, createimg, description } from "./element.js";

/**
 *POPULARCARD
 This function is used to create a card component that displays 
 the five most trending movies or tv series
 * @param {*} data
 * specifies the  data to be used
 * @param {*} trend
 * specifies the type of trend i.e either movie or tv
 * @param {*} link
 * the link to the page it will be taken too when an element in the card is selected
 * @param {*} morelink
 * the link to the page it will be taken too, to view related content
 */

function popularCard(data, trend, link, morelink) {
  // sort the data in desending order
  const sortTrend = data.sort((a, b) => b.vote_count - a.vote_count);
  // create a card for the first element in the array
  const { poster_path, title, name, id } = sortTrend[0];
  let attrib;
  // checks for the media type of the item
  trend == ".movie" ? (attrib = "movie") : (attrib = "tv");
  const cad = card(
    poster_path,
    name || title,
    "center",
    "",
    `${id} ${attrib}`,
    link
  );
  cad.addEventListener("click", description);
 const trendingCard = document.querySelector(trend)
  trendingCard.innerHTML = "";
  trendingCard.append(cad);
  let i = 1;
  // It will remove the first four element starting with the second element
  sortTrend.slice(1, 5).forEach((item) => {
    const { title, name, id } = item;
    const trending = popular(++i, title || name, "", link, `${id} ${attrib}`);
    trending.addEventListener("click", description);
    document.querySelector(trend).append(trending);
  });
  const para = p("more", "more");
  const a = createElement("a", "center", para);
  a.setAttribute("href", morelink);
  console.log(a);
  document.querySelector(trend).append(a);
}
/**
 *It create a card component with an image and a title
 * @param {*} path
 * it specifies the image path
 * @param {*} title
*it specifies the name of the card
* @param {*} pClass
 * specifies the class for the parent element
 * @param {*} clas
 * specifies the class for the image element
 * @param {*} id
 * specifies the id for the parent element
 * @param {*} link
 * the link to the page it will be taken too when an element in the card is selected
 * @param {*} content
 * specifies the text content
 * @param {*} date
 * specifies the date the content was created
 * @return {*}
 * it returns the card components
 */
function card(path, title, pClass, clas, id, link, content, date) {
  const img = createimg(path, "", pClass, clas, id);
  let para, span;
  if (link && link != "") {
    let p1 = p("font-small text-image", title);
    para = createElement("a", "", p1);
    para.setAttribute("href", link);
  } else para = p("font-small text-image", title);
  // if there is a content parameter it will execute the component
  if (content && content != "") {
    const time = new Date(date);
    const dateP = p("date", time.toDateString());
    para.append(dateP);
    const para1 = p("font-small content", content);
    span = createElement("span", "text", [para, para1]);
  } else span = createElement("span", "text center", para);
  img.append(span);
  return img;
}

/**
 *POPULAR
 This function creates a span element with with 2 child element i.e p.
 * @param {*} num
 *specifies the ranking position
 * @param {*} name
 * specifies the name of the ranking element
 * @param {*} clas
 * specifies the class of the parent element 
 * @param {*} link
 * specifies the path to the page it will be taken to when the name element is clicked on
 * @param {*} id
 * specifies the id of the parent element 
 * @return {*} 
 * it will return the parent element
 */
function popular(num, name, clas, link, id) {
  let span;
  const p1 = p("rank", num);
  const p2 = p("info", name);
  if (link) {
    const addr = createElement("a", "", p2);
    addr.setAttribute("href", link);
    span = createElement("span", clas, [p1, addr], id);
  } else span = createElement("span", clas, [p1, p2]);
  return span;
}

/**
 *P
 *This function creates a p element with optional class or id
 * @param {*} clas
 * specifies the class for the p element
 * @param {*} content
 * specifies the text content for the p element
 * @param {*} id
 * specifies the id for the p elemnt
 * @return {*}
 * returns the p element
 */
function p(clas, content, id) {
  const p = createElement("p", clas, "", id);
  p.textContent = content;
  return p;
}

export { popularCard, card, popular };

import { createElement, createimg } from "./element.js";

function popularCard(data, trend, link, morelink) {
  // sort the data in desending order
  const sortTrend = data.sort((a, b) => b.vote_count - a.vote_count);
  // create a card for the first element in the array
  const { poster_path, title, name, id } = sortTrend[0];
  let attrib;
  trend == ".movie" ? (attrib = "movie") : (attrib = "tv");
  const cad = card(
    poster_path,
    name || title,
    "center",
    "",
    `${id} ${attrib}`,
    link
  );
  document.querySelector(trend).append(cad);
  let i = 1;
  // It will remove the first four element starting with the second element
  sortTrend.slice(1, 5).forEach((item) => {
    const { title, name, id } = item;
    const trending = popular(++i, title || name, "", link, `${id} ${attrib}`);
    document.querySelector(trend).append(trending);
  });
  const para = p("more", "more");
  const span = createElement("a", "center", para);
  span.setAttribute("href", morelink);
  console.log(span);
  document.querySelector(trend).append(span);
}

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

//

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

function p(clas, content, id) {
  const p = createElement("p", clas, "", id);
  p.textContent = content;
  return p;
}

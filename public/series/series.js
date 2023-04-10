import { getData, swiper, nav, myFunction, collaps } from "../index.js";
const links = ["../movie/movie.html", "./series.html"];
document.addEventListener("DOMContentLoaded", () => {
  getData("tv", links);
});
nav(), myFunction(), collaps();
swiper;

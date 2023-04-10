import { getData, swiper, nav, myFunction, collaps } from "../index.js";
import { popularCard } from "../Desc/desc.js";

const links = ["./movie.html", "../series/series.html"];
document.addEventListener("DOMContentLoaded", () => {
    console.log("movie yes");
  getData("movie", links);
});
nav(), myFunction(), collaps();
popularCard();
swiper;

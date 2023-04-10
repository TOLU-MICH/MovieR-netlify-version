import * as main from "./modules/nav.js";
import { getData, swiper } from "./modules/main.js";
main.myFunction(), main.nav(), main.collaps();

const swipContainer = document.querySelector(".swiper-wrapper");
const links = ["./movie/movie.html", "./series/series.html"];
getData("", links);
swiper;

document
  .querySelectorAll(".container .child")
  .forEach((item) => item.addEventListener("click", description));
document.querySelectorAll(".trending").forEach((item) => {
  item.childNodes.forEach((elem) =>
    elem.addEventListener("click", description)
  );
});

// it's gets the id and the media_type of the movie and then send it to the server on click.
async function description() {
  const id = this.id;
  // it get the id as a string and then split it into an array of substring
  const array = id.split(" ");
  console.log(this);
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
  console.log("ys");
  const data = await fetch("/desc", options);
  const response = await data.json();
  console.log(response);
}

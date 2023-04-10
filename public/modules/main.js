import { popularCard } from "./card.js";
import { createimg, createElement } from "./element.js";

async function getData(request, morelink) {
  const response = await fetch("/movie");
  const data = await response.json();
  const { trending, popular } = data;
  const trendResponse = await fetch("/trend");
  const trendData = await trendResponse.json();
  const { series, movie } = trendData;
  // if there is an argument it will execute the statement
  let sortData, addr;
  if (request && request != "") {
    // sort the data in descending order using the vote count
    if (request == "movie") {
      sortData = movie.sort((a, b) => b.vote_count - a.vote_count);
    } else {
      //  the argument is not 'movie' then it will display the trending tv series
      sortData = series.sort((a, b) => b.vote_count - a.vote_count);
    }
    addr = "../Desc/desc.html";
  }
  // if no argument is supplied it will display the trending movies and tv series together
  else {
    sortData = trending.sort((a, b) => b.vote_count - a.vote_count);
    addr = "./Desc/desc.html";
  }
  const sortPopular = popular.sort((a, b) => b.vote_count - a.vote_count);
  /*set the swipper content to be empty once the data as been fetched */
  swipContainer.innerHTML = " ";
  sortPopular.forEach((item) => {
    const { id, poster_path, media_type } = item;
    // define the swipper content for each of the item
    let imageDiv = createimg(poster_path, media_type, "swiper-slide", "", id);
    swipContainer.appendChild(imageDiv);
    // const swiper = document.querySelector(".swiper").swiper;
    // // moves the swipper every 4seconds
    // setInterval(() => {
    //   // Now you can use all slider methods like
    //   swiper.slideNext();
    // }, 4000);
  });
  console.log(sortData);
  let i = 0;
  for (let item of sortData) {
    const { id, title, name, poster_path, media_type } = item;

    const impst = createimg(
      poster_path,
      media_type,
      "child",
      "",
      `${id} ${media_type}`
    );
    const p = createElement("p", "", title || name);
    const link = createElement("a", "", p);
    impst.append(link);
    link.setAttribute("href", addr);
    // impst.id = `${i++}`;
    impst.addEventListener("click", description);
    document.querySelector(".container").append(impst);
  }
  popularCard(movie, ".movie", addr, morelink[0]);
  popularCard(series, ".tv", addr, morelink[1]);
}

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 6,
      spaceBetween: 40,
    },
  },
});

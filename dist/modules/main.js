import { popularCard } from "./card.js";
import { createimg, createElement, description } from "./element.js";
const swipContainer = document.querySelector(".swiper-wrapper");
const container = document.querySelector(".container");

/**
 *GETDATA
 *This function is responsible for populating the whole page
 * @param {*} request
 * specifies the kind of request
 * @param {*} morelink
 * the link to the page it will be taken too, to view related content
 */
async function getData(request, morelink) {
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < 18; i++) {
    container.append(cardTemplate.content.cloneNode(true));
  }

  const response = await fetch("/api/movie");
  const data = await response.json();
  const { trending, popular } = data;
  const trendResponse = await fetch("/api/trend");
  const trendData = await trendResponse.json();
  const { series, movie } = trendData;
  let sortData, addr;
  // if there is an argument it will execute the statement
  if (request && request != "") {
    if (request == "movie") {
      // sort the data in descending order using the vote count
      sortData = movie.sort((a, b) => b.vote_count - a.vote_count);
    } else {
      //if the argument is not 'movie' then it will display the trending tv series
      sortData = series.sort((a, b) => b.vote_count - a.vote_count);
    }
    addr = "../Desc/desc.html";
  }
  // if no argument is supplied it will display the trending movies and tv series together
  else {
    sortData = trending.sort((a, b) => b.vote_count - a.vote_count);
    addr = "dist/Desc/desc.html";
  }
  const sortPopular = popular.sort((a, b) => b.vote_count - a.vote_count);
  /*set the swipper content to be empty once the data as been fetched */
  swipContainer.innerHTML = " ";
  sortPopular.forEach((item) => {
    const { id, poster_path } = item;
    // define the swipper content for each of the item
    let imageDiv = createimg(
      poster_path,
      "movie",
      "swiper-slide",
      "",
      `${id} movie`
    );
    imageDiv.addEventListener("click", function () {
      description(this);
      location.href = addr;
    });
    swipContainer.appendChild(imageDiv);
  });

  // slides the swipper every 4seconds
  const swiper = document.querySelector(".swiper").swiper;
  setInterval(() => {
    swiper.slideNext();
  }, 4000);

  container.innerHTML = "";
  // it populates the page with data given
  const sorted = sortData.slice(0, 18);

  populating(sorted, addr);

  popularCard(movie, ".movie", addr, morelink[0]);
  popularCard(series, ".tv", addr, morelink[1]);

  const buttn = document.querySelector(".input-group .btn");
  buttn.addEventListener("click", () => search(addr));
}

/**
 *It's responsible for searching and bringing out the result
 *
 * @param {*} addr
 * it specifies the link that you'll redirected to when the title is clicked on
 */
async function search(addr) {
  const input = document.querySelector(".input");
  const inpValue = input.value;
  if (inpValue.length >= 1) {
    const data = await fetch("/.netlify/functions/search", {
      method: "POST",
      body: JSON.stringify({
        value: inpValue,
      }),
    });

    const response = await data.json();
    const sortData = response.sort((a, b) => b.vote_count - a.vote_count);
    container.innerHTML = "";
    populating(sortData, addr);
    inpValue.value = "";
  }
}

/**
 *POPULATING
 *This function iterate over a data,
 populate the parent element with a card component for each of the item of the given data  
 * @param {*} data
 * This is the data that will be iterated
 */
function populating(data, addr) {
  container.innerHTML = "";
  data.forEach((item) => {
    const { id, title, name, poster_path, media_type } = item;
    if (poster_path != null) {
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
      impst.addEventListener("click", function () {
        description(this);
      });
      container.append(impst);
    }
  });
}
// this function is responsible for the swipper
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

export { getData, swiper };

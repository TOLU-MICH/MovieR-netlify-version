const swipContainer = document.querySelector(".swiper-wrapper");
// const movieArray = {
//   backdrop_path: "/6Lw54zxm6BAEKJeGlabyzzR5Juu.jpg",
//   genre_ids: (3)[(10765, 10759, 18)],
//   media_type: "tv",
//   name: "The Mandalorian",
//   original_language: "en",
//   overview:
//     "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
//   poster_path: "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
//   release_date: undefined,
//   title: undefined,
// };

// getData();
async function getData() {
  const response = await fetch("/movie");
  const data = await response.json();
  // sort the data in descending order using the vote count
  const sortData = data.sort((a, b) => b.vote_count - a.vote_count);
  /*set the swipper content to be empty once the data as been fetched */
  // swipContainer.innerHTML = " ";
  console.log(sortData);
  let i = 0;
  for (let item of sortData) {
    const {
      id,
      original_language,
      title,
      name,
      overview,
      genre_ids,
      backdrop_path,
      poster_path,
      media_type,
      release_date,
    } = item;
    // define the swipper content for each of the item
    // let imageDiv = createimg(poster_path, media_type, "swiper-slide");
    // swipContainer.appendChild(imageDiv);
    // const swiper = document.querySelector(".swiper").swiper;
    // moves the swipper every 4seconds
    // setInterval(() => {
    //   // Now you can use all slider methods like
    //   swiper.slideNext();
    // }, 4000);

    const impst = createimg(poster_path, media_type, "child center");
    const p = createElement("p", "", title || name);
    impst.append(p);
    impst.id = `${i++}`;
    impst.addEventListener("click", description);
    document.querySelector(".container").append(impst);
  }
  console.log("done");
}

function createimg(image, tag, parentClass, clas, id, size) {
  let span, div;
  const img = new Image();
  size ? (size = "original") : (size = "w342");
  img.src = `https://image.tmdb.org/t/p/${size}/` + image;
  if (clas && clas != "") img.setAttribute("class", clas);
  if (tag && tag != "") {
    span = createElement("span", "type", tag);
    div = createElement("div", parentClass, [span, img]);
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

document
  .querySelectorAll(".child")
  .forEach((item) => item.addEventListener("click", description));
async function description() {
  // const parent = e.target.parentElement.id;
  //  console.log(id,media_type);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 76600,
      media_type: "movie",
    }),
  };
  console.log("ys");
  const data = await fetch("/desc", options);
  const response = await data.json();
  console.log(response);
}
// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   direction: "horizontal",
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // Default parameters
//   slidesPerView: 1,
//   spaceBetween: 10,
//   // Responsive breakpoints
//   breakpoints: {
//     // when window width is >= 320px
//     320: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     // when window width is >= 480px
//     480: {
//       slidesPerView: 3,
//       spaceBetween: 30,
//     },
//     // when window width is >= 640px
//     640: {
//       slidesPerView: 6,
//       spaceBetween: 40,
//     },
//   },
// });

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
document.querySelector(".container").addEventListener("click", nav);
document.querySelector(".icon").addEventListener("click", myFunction);
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function nav(x) {
  document.querySelector('.container').classList.toggle("change");
}
export { createElement, createimg, myFunction, nav };

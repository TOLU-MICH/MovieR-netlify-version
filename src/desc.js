import { collaps, myFunction, nav } from "../dist/modules/nav.js";
import { popularCard, card, popular } from "../dist/modules/card.js";
import { description } from "../dist/modules/element.js";

let response,
  recm = document.querySelector(".recommendation");
const swipContainer = document.querySelector(".swiper-wrapper");

for (let i = 0; i < 6; i++) {
  document.querySelector(
    ".review-skeleton"
  ).innerHTML += `<div class="text-image review"><img src="" class="review-img"><span class="text"><span class="text-image"><p class="font-small skeleton skeleton-tag"></p><p class="date skeleton skeleton-small"></p></span><p class="font-small content"><div><p class="skeleton skeleton-text"></p><p class="skeleton skeleton-text"></p><p class="skeleton skeleton-text"></p></div></p></span></div>`;
  recm.innerHTML += `<div class="child center" id="4194 tv"><img src=""  class="skeleton"><span class="text center"><p class="font-small text-image skeleton skeleton-tag  "></p></span></div>`;
  document.querySelector(
    ".skeleton-overview"
  ).innerHTML += `<div class="skeleton skeleton-text"></div><div class="skeleton skeleton-text"></div>`;
  swipContainer.innerHTML += `<div class="swiper-slide center"><img src="" alt="" class="skeleton" /><span class="more"><p class="skeleton skeleton-text"></p><p class="skeleton skeleton-tag "></p></span></div>`;
}

// the list of all languages and there abrivation
const lang_list = {
  af: "Afrikaans",
  sq: "Albanian ",
  am: "Amharic ",
  ar: "Arabic ",
  an: "Aragonese ",
  hy: "Armenian ",
  ast: "Asturian ",
  az: "Azerbaijani ",
  eu: "Basque ",
  be: "Belarusian ",
  bn: "Bengali ",
  bs: "Bosnian ",
  br: "Breton ",
  bg: "Bulgarian ",
  ca: "Catalan ",
  ckb: "Central Kurdish",
  zh: "Chinese ",
  "zh-HK": "Chinese (Hong Kong)",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  "en-AU": "English (Australia)",
  "en-CA": "English (Canada)",
  "en-IN": "English (India)",
  "en-NZ": "English (New Zealand)",
  "en-ZA": "English (South Africa)",
  "en-GB": "English (United Kingdom)",
  "en-US": "English (United States)",
  eo: "Esperanto",
  et: "Estonian",
  fo: "Faroese",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  "fr-CA": "French (Canada)",
  "fr-FR": "French (France)",
  "fr-CH": "French (Switzerland)",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  "de-AT": "German (Austria)",
  "de-DE": "German (Germany)",
  "de-LI": "German (Liechtenstein)",
  "de-CH": "German (Switzerland)",
  el: "Greek",
  gn: "Guarani",
  gu: "Gujarati",
  ha: "Hausa",
  haw: "Hawaiian Hawaiʻi",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  ia: "Interlingua",
  ga: "Irish",
  it: "Italian",
  "it-IT": "Italian (Italy)",
  "it-CH": "Italian (Switzerland)",
  ja: "Japanese",
  kn: "Kannada",
  kk: "Kazakh тілі",
  km: "Khmer",
  ko: "Korean",
  ku: "Kurdish",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  ln: "Lingala",
  lt: "Lithuanian",
  mk: "Macedonian",
  ms: "Malay ",
  ml: "Malayalam",
  mt: "Maltese",
  mr: "Marathi",
  mn: "Mongolian",
  ne: "Nepali",
  no: "Norwegian",
  nb: "Norwegian Bokmål ",
  nn: "Norwegian Nynorsk",
  oc: "Occitan",
  or: "Oriya",
  om: "Oromo",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  pa: "Punjabi",
  qu: "Quechua",
  ro: "Romanian",
  mo: "Romanian (Moldova)",
  rm: "Romansh",
  ru: "Russian",
  gd: "Scottish Gaelic",
  sr: "Serbian",
  sh: "Serbo",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  st: "Southern Sotho",
  es: "Spanish",
  "es-AR": "Spanish (Argentina)",
  "es-419": "Spanish (Latin America)",
  "es-MX": "Spanish (Mexico)",
  "es-ES": "Spanish (Spain)",
  "es-US": "Spanish (United States)",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  tt: "Tatar",
  te: "Telugu",
  th: "Thai",
  ti: "Tigrinya",
  to: "Tongan",
  tr: "Turkish",
  tk: "Turkmen",
  tw: "Twi",
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek",
  vi: "Vietnamese",
  wa: "Walloon",
  cy: "Welsh",
  fy: "Western Frisian",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

// const descript = require("../../thing.json");
collaps(), myFunction(), nav(), getdata();
async function getdata() {
  response = await fetch("/api/description");
  const data = await response.json();
  console.log(data);
  const { details, cast, recommendation, review, media_type } = data;
  const trendResponse = await fetch("/api/trend");
  const trendData = await trendResponse.json();
  const { movie, series } = trendData;
  console.log(recommendation, cast);
  // sort the data in desending order using the votecount
  const sortRecm = recommendation.sort((a, b) => b.vote_count - a.vote_count);
  // release date
  document.querySelectorAll(".premiere").forEach((item) => {
    item.innerHTML = details.release_date;
  });
  document.querySelector(".movie_type").textContent = media_type;
  // background image of the movie
  const backdrop = document.querySelector(".backdrop");
  backdrop.classList.remove("skeleton");
  backdrop.src = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;
  // image of the movie
  const imag = document.querySelector(".img-child");
  imag.classList.remove("skeleton");
  imag.src = `https://image.tmdb.org/t/p/original${details.poster_path}`;
  // Title
  document.querySelector(".title").innerHTML = details.title;
  // Title for the document
  document.querySelector("title").innerText = details.title;
  //  tagline of the movie
  document.querySelector(".tagline").innerHTML = details.tagline;
  //  overview
  document.querySelector(".overview").innerHTML = details.overview;
  // genre
  document.querySelector(".genre").innerHTML = "";
  details.genres.forEach((item) => {
    document.querySelector(".genre").innerHTML += ` ${item.name} |`;
  });
  // cast
  swipContainer.innerHTML = "";
  // it gets the first 7 items from the data
  cast.slice(0, 6).forEach((item) => {
    const { name, profile_path } = item;
    // if there is a profile picture it will display the item
    if (profile_path != null) {
      const text = popular(name, "Cast", "more");
      const cad = card(profile_path, "", "swiper-slide center");
      cad.append(text);
      swipContainer.append(cad);
    }
  });
  // imdb
  document.querySelector(".imdb").classList.remove("skeleton,skeleton-tag");
  document.querySelector(
    ".imdb"
  ).innerHTML = `<a href="https://www.imdb.com/title/${details.imdb_id}" target="_blank">https://www.imdb.com/title/${details.imdb_id}</a>`;
  // release date
  document.querySelectorAll(".premiere").innerHTML = details.release_date;
  // language
  const language = lang_list[details.original_language];
  document.querySelector(".lang").textContent = language;

  // review
  document.querySelector(".review-container").innerHTML = " ";
  for (const item of review) {
    const { username, avatar_path } = item.author_details;
    const { content, updated_at } = item;
    // if the item as a profile picture
    if (avatar_path != null) {
      // checks if the profile path is a url
      if (avatar_path.length == 32) {
        // if it's not a url it will execute the statement
        const cad = card(
          avatar_path,
          username,
          "text-image review",
          "review-img",
          "",
          "",
          content,
          updated_at
        );

        document.querySelector(".review-container").append(cad);
        console.log(avatar_path.length);
      }
    }
  }

  const addr = "./desc.html";
  // recommendation
  recm.innerHTML = "";
  for (const item of sortRecm) {
    const { id, title, poster_path } = item;
    // checks if there is a path to the image
    if (poster_path != null) {
      const cad = card(
        poster_path,
        title,
        "child center",
        "",
        `${id} ${media_type}`,
        addr
      );
      cad.addEventListener("click", function () {
        description(this);
      });
      recm.append(cad);
    }
  }

  // trending
  popularCard(movie, ".movie", addr, "../movie/movie.html");
  popularCard(series, ".tv", addr, "../series/series.html");
}

document.querySelectorAll(".content").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.whiteSpace = "normal";
  });
});

const swiper = new Swiper(".swiper", {
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

const express = require("express");
require("dotenv").config();

const app = express();
app.listen(2078, () => console.log("listening at 2078"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const apiKey = process.env.API_KEY;

app.get("/trend", async (req, res) => {
  const trendingSeries = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`
  );
  const trendingMovie = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );
  const seriesJson = await trendingSeries.json();
  const movieJson = await trendingMovie.json();
  res.json({
    series: seriesJson.results,
    movie: movieJson.results,
  });
});

app.get("/movie", async (req, res) => {
  const trending = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
  );
  const popular = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );

  const trendJson = await trending.json();
  const popularJson = await popular.json();
  res.json({
    trending: trendJson.results,
    popular: popularJson.results,
  });
  console.log("sent!");
});

let id, media_type;
// These router is responsible for fetching the date needed by the description page
app.get("/desc", async (req, res) => {
  const details = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
  );
  const cast = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}`
  );
  const recommendation = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${apiKey}`
  );
  const reviews = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/reviews?api_key=${apiKey}`
  );
  const detailsJson = await details.json();
  const castJson = await cast.json();
  const reviewsJson = await reviews.json();
  const recommendationJson = await recommendation.json();
  res.json({
    details: detailsJson,
    cast: castJson.cast,
    recommendation: recommendationJson.results,
    review: reviewsJson.results,
    media_type: media_type,
  });
});

app.post("/desc", async (req, res) => {
  const data = await req.body;
  id = data.id;
  media_type = data.media_type;
  res.json(data);
  console.log(data);
});

app.post("/desc/inp", async (req, res) => {
  const data = await req.body.value;
  const search = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${data}`
  );
  const searchJson = await search.json();
  res.json(searchJson.results);
});

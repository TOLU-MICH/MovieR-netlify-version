const express = require("express");
require("dotenv").config();

const app = express();
app.listen(2078, () => console.log("listening at 2078"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const apiKey = process.env.API_KEY;
app.get("/movie", async (req, res) => {
  const trending = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=" + apiKey
  );
  const popular = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
  );
  const json = await data.json();
  const popularJson = await popular.json();
  res.json({ trending: json.results, popular: popularJson.results });
  console.log("sent!");
});
let data;
let id, media_type;
app.get("/desc", async (req, res) => {
  // const {id, media_type} = data
  // const details = fetch(
  //   `https://api.themoviedb.org/3/movie/76600?api_key=${apiKey}&language=en-US`
  // );
  // const cast = await fetch(
  //   `https://api.themoviedb.org/3/movie/76600/credits?api_key=${apiKey}`
  // );
  const recommendation = await fetch(
    `https://api.themoviedb.org/3/movie/76600/similar?api_key=${apiKey}`
  );
  const reviews = await fetch(
    `https://api.themoviedb.org/3/movie/76600/reviews?api_key=${apiKey}`
  );
  const trending = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
  );
  // const detailsJson = await details.json();
  // const castJson = await cast.json();
  const reviewsJson = await reviews.json();
  const recommendationJson = await recommendation.json();
  const trendingJson = await trending.json();
  console.log(reviews);
  res.json({
    // details: detailsJson,
    // cast: castJson.cast,
    trending: trendingJson.results,
    recommendation: recommendationJson.results,
    review: reviewsJson.results,
  });
});

app.post("/desc", async (req, res) => {
  data = await req.body;
  res.json(data);
  console.log(data);
});

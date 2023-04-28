require("dotenv").config();
const apiKey = process.env.API_KEY;
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  // get the trending tv series for the present day
  const trendingSeries = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`
  );
  // get the trending movies for the present day
  const trendingMovie = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
  );
  const seriesJson = await trendingSeries.json();
  const movieJson = await trendingMovie.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      series: seriesJson.results,
      movie: movieJson.results,
    }),
  };
};

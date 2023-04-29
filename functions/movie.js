// require("dotenv").config();
const apiKey = process.env.API_KEY;
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  // get the trendig movies and tv series for the present day
  const trending = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    );

  // get the popular movies and tv series f
  //   const popular = await fetch(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  // );

  const trendJson = await trending.json();
  // const popularJson = await popular.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      trending: trendJson.results,
      // popular: popularJson.results,
    }),
  };
};

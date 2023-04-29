// require("dotenv").config();
const apiKey = process.env.API_KEY;
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // get the trendig movies and tv series for the present day
  const trending = await fetch(`https://api.github.com/users/github`);

  // get the popular movies and tv series f
  //   const popular = await fetch(
  //   `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  // );

  const trendJson = await trending.json();
  // const popularJson = await popular.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      trending: trendJson,
      // popular: popularJson.results,
    }),
  };
};

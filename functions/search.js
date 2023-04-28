require("dotenv").config();
const apiKey = process.env.API_KEY;
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  const data = JSON.parse(event.body);
  // get the search result for the item specified in the search bar
  const search = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${data.value}`
  );
  const searchJson = await search.json();

  return {
    statusCode: 200,
    body: JSON.stringify(searchJson.results),
  };
};

const apiKey = process.env.API_KEY;
const fsp = require("fs/promises");
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  // execute this code if a post request is sent to the function
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);
    const id = data.id;
    const media_type = data.media_type;
    // creates a json file with the id and media_type of the card selected
    fsp.writeFile("thing.json", JSON.stringify({ id, media_type }));

    return {
      // return the code 200 to tell netlify that the post request was successful
      statusCode: 200,
      message: "POST successful",
    };
  } else {
    const response = require("../thing.json");

    const id = response.id;
    const media_type = response.media_type;
    // get the details of the card that is clicked
    const details = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
    );
    // get the cast  of the card that is clicked
    const cast = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${apiKey}`
    );
    // gets similar films  for the card that is clicked
    const recommendation = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${apiKey}`
    );
    // get the reviews for the card is clicked on
    const reviews = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/reviews?api_key=${apiKey}`
    );
    const detailsJson = await details.json();
    const castJson = await cast.json();
    const reviewsJson = await reviews.json();
    const recommendationJson = await recommendation.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        details: detailsJson,
        cast: castJson.cast,
        recommendation: recommendationJson.results,
        review: reviewsJson.results,
        media_type: media_type,
      }),
    };
  }
};

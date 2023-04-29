// require("dotenv").config();
const apiKey = process.env.API_KEY;
// import fetch from "node-fetch";

exports.handler = async function (event, context) {

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey
    }),
  };
};

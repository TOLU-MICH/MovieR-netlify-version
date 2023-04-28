const apiKey = process.env.API_KEY;

exports.handler = async function (event, context) {
  console.log(typeof apiKey);
  const response = require("../thing.json");
  return {
    statusCode: 200,
    body: response,
  };
};

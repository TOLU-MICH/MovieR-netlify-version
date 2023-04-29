const apiKey = process.env.API_KEY;

exports.handler = async function (event, context) {
  console.log(typeof apiKey);
  return {
    statusCode: 200,
    body: "apiKey",
  };
};

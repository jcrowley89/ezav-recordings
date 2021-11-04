if (process.env.NODE_ENV !== "production") require("dotenv").config();
const CloudConvert = require("cloudconvert");

const api_key = process.env.CLOUD_CONVERT_API_KEY;
const cloudConvert = new CloudConvert(api_key);

module.exports = cloudConvert;
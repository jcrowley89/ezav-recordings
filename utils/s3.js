if (process.env.NODE_ENV !== "production") require("dotenv").config();
const AWS = require("aws-sdk");

const endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);

var s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

module.exports = s3;
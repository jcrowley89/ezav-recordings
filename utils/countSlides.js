require("dotenv").config();
const s3 = require("./s3");

module.exports = async (prefix) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Prefix: prefix,
  };
  const data = await s3.listObjects(params).promise();
  return data.Contents.length;
};
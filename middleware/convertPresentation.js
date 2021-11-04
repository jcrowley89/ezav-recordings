if (process.env.NODE_ENV !== "production") require("dotenv").config();
const cloudConvert = require("../utils/cloudConvert");
const path = require("path");

module.exports = async (req, res, next) => {
  try {
    let job = await cloudConvert.jobs.create({
      tasks: {
        "import-presentation": {
          operation: "import/s3",
          bucket: process.env.S3_BUCKET,
          region: process.env.S3_REGION,
          access_key_id: process.env.AWS_ACCESS_KEY_ID,
          secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
          key: `${req.file.fieldname}-${req.body.dateString}${path.extname(
            req.file.originalname
          )}`,
        },
        "convert-presentation": {
          operation: "convert",
          input: ["import-presentation"],
          output_format: "png",
        },
        "export-presentation": {
          operation: "export/s3",
          input: ["convert-presentation"],
          bucket: process.env.S3_BUCKET,
          region: process.env.S3_REGION,
          access_key_id: process.env.AWS_ACCESS_KEY_ID,
          secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
          key: `${req.file.fieldname}-${req.body.dateString}-out.png`,
        },
      },
    });
    job = await cloudConvert.jobs.wait(job.id);
    next();
  } catch (err) {
    next(err);
  }
};

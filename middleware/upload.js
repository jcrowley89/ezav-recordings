const multer = require("multer");
const s3 = require("../utils/s3");
const multerS3 = require("multer-s3");
const path = require("path");

const programStorage = multerS3({
  s3: s3,
  bucket: "ezav-recordings",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${file.fieldname}-${req.body.dateString}.png`);
  }
});

const presentationStorage = multerS3({
  s3: s3,
  bucket: "ezav-recordings",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${file.fieldname}-${req.body.dateString}${path.extname(file.originalname)}`);
  }
});

const videoStorage = multerS3({
  s3: s3,
  bucket: "ezav-recordings",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${req.params.programSlug}/videos/${req.params.recordingSlug}${path.extname(file.originalname)}`);
  }
});

const upload = {
    program: multer({ storage: programStorage }).fields([{name: "logo", maxCount: 1}, {name: "frame", maxCount: 1}]),
    video: multer({ storage: videoStorage }).single("video"),
    presentation: multer({ storage: presentationStorage }).single("presentation"),
};

module.exports = upload;
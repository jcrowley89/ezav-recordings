const express = require("express");
const router = require("./router");
const path = require("path");
const s3 = require("./utils/s3");

const app = express();

app.use(express.json());

app.use(express.static("client/build"));

try {
  app.get("/media/:file", (req, res, next) => {
    s3.getObject({ Bucket: "ezav-recordings", Key: `${req.params.file}` })
      .createReadStream()
      .pipe(res)
      .on("error", (e) => console.log(e));
  });
} catch (e) {
  console.log(e);
}

app.use("/api", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(5000);

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const config = require("./config/key");
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("몽고DB가 연결됐습니다. ;>"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://movie-tasters.herokuapp.com/",
      credentials: true,
    })
  );
  app.use(express.static(path.join(__dirname, "client/build")));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

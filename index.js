const path = require("path");
const express = require("express");
const dist = path.join(__dirname, "dist");

const app = express();

app.use(express.static(dist));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(dist, "index.html"));
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});

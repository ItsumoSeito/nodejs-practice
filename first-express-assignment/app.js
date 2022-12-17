const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("In the users handler");
  res.send("<h1>This is the response</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In the / handler");
  res.send("<h1>This is the / handler</h1>");
});

app.listen(3000);

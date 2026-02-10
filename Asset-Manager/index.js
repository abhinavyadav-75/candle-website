const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "testsecret",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  res.send("Website running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

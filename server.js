const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const MenuItem = require("./models/menuitem");

app.get("/", (req, res) => {
  res.send("Hello Welcome to Gathiya House! How I can Help You?");
});

// Import the router file
const personRouts = require("./routes/personRoutes");
const menuItemRouts = require("./routes/menuItemRoutes");

// Use he routers
app.use("/person", personRouts);
app.use("/menu", menuItemRouts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

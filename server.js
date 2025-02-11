const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");
const passport = require("./auth");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next(); // Move on the next Phase
};

const MenuItem = require("./models/menuitem");

// Use logRequest in all routes
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.send("Hello Welcome to Gathiya House! How I can Help You?");
});

// Import the router file
const personRouts = require("./routes/personRoutes");
const menuItemRouts = require("./routes/menuItemRoutes");

// Use he routers
app.use("/person", localAuthMiddleware, personRouts);
app.use("/menu", localAuthMiddleware, menuItemRouts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

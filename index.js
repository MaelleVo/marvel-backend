require("dotenv").config();

// EXPRESS & AXIOS & CORS
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// ROUTER
const router = express.Router();

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// APP USE
const app = express();
app.use(express.json());
app.use(cors());

// APIKEY
const apiKey = process.env.apiKey;

// ROUTES
const comicsRoute = require("./routes/comics.routes");
const charactersRoute = require("./routes/characters.routes");
const comicRoute = require("./routes/comic.routes");
const characterRoute = require("./routes/character.routes");
const characterInComicsRoute = require("./routes/info.routes");
const userRoute = require("./routes/user.routes");

// HOME
app.get("/", (req, res) => {
  res.status(200).json({ message: "Home Page" });
});

// FETCH COMICS
app.use(comicsRoute);

// FETCH CHARACTERS
app.use(charactersRoute);

// FETCH COMIC/COMICS:ID
app.use(comicRoute);

// FETCH CHARACTER/CHARACTERS:ID
app.use(characterRoute);

// FETCH COMICS/CHARACTER:ID
app.use(characterInComicsRoute);

// USER(S) SIGNUP & LOGIN
app.use(userRoute);

// ALL ROUTES
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found - 404" });
});

// SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log("Server started 🦊");
});

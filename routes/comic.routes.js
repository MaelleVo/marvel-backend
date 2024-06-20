const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.apiKey;

router.get("/comic/:comicId", async (req, res) => {
  const { comicId } = req.params;

  try {
    console.log("Using apiKey: ", apiKey);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}`,
      {
        params: {
          apiKey: apiKey,
        },
      }
    );

    console.log("API response:", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;

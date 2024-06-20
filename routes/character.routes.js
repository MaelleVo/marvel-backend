const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.apiKey;

router.get("/character/:characterId", async (req, res) => {
  const { characterId } = req.params;

  try {
    console.log("Using apiKey: ", apiKey);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}`,
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

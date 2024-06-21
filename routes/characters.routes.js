require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.apiKey;

// ROUTE FOR ALL CHARACTERS
router.get("/characters", async (req, res) => {
  try {
    // console.log("apiKey: ", apiKey);

    const { name, page = 1, limit } = req.query;
    const offset = (page - 1) * limit;

    const params = {
      apiKey: apiKey,
      name: name,
      limit: limit,
      skip: offset,
    };

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      { params }
    );
    const { results, count } = response.data;

    console.log("API response:", response.data);
    res.json({
      count: count,
      results: results,
      page: page,
      limit: limit,
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;

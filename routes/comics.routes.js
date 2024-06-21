require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.apiKey;

// ROUTE FOR ALL COMICS
router.get("/comics", async (req, res) => {
  try {
    console.log("Using apiKey: ", apiKey);

    const { title, page = 1, limit } = req.query;
    const offset = (page - 1) * limit;

    const params = {
      apiKey: apiKey,
      title: title,
      limit: limit,
      skip: offset,
    };

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics`,
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

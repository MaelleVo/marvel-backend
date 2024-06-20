const express = require("express");
const router = express.Router();

// ENCRYPT
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const convertToBase64 = require("../utils/convertToBase64");

// MODEL
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).json({ message: "You need to have an username" });
    }

    const emailCheck = await User.findOne({ email: req.body.email });

    if (emailCheck) {
      return res.status(409).json({ message: "This email is already used" });
    }
    // ENCRYPT
    const password = req.body.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    // NEW SIGNUP
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      token: token,
      hash: hash,
      salt: salt,
    });

    // SAVE NEW SIGN UP USER
    // console.log(newSignup);

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      token: newUser.token,
      account: newUser.account,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST LOGIN
router.post("/login", async (req, res) => {
  // console.log(req.body)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
    // PASSWORD CHECK
    const checkPassword = SHA256(req.body.password + user.salt).toString(
      encBase64
    );

    if (checkPassword === user.hash) {
      return res.status(200).json({
        _id: user._id,
        token: user.token,
      });
    } else {
      return res.status(400).json({ message: "email or password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

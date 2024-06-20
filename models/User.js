// REQUIRE MONGOOSE
const mongoose = require("mongoose");

// MODEL USER
const User = mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
});

// EXPORT MODULE
module.exports = User;

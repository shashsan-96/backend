const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    firstname:String,
    lastname:String,
    mobile:String,
    address:String,
    zip:String,
    city:String,
    country:String

  })
);

module.exports = User;

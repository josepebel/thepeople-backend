const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  photo: String,
  name: String,
  lastname: String,
  dob: Date,
  job: String,
  bio: String,
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProfileModel = mongoose.model("profile", ProfileSchema);

module.exports = ProfileModel;

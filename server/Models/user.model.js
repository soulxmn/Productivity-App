const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, required: true },
  tenant: { type: String, required: true },
  connection: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  debug: { type: Boolean, required: false },
  points: { type: Number, required: false, default: 0 },
  completedProjects: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

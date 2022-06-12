const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, "User id required"],
  },
  title: {
    type: String,
    required: [true, "This field is required"],
  },
  content: {
    type: String,
    required: [true, "This field is required"],
  },
});

const NotesModel = mongoose.model("notes", NotesSchema);
module.exports = NotesModel;

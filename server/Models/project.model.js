const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  projectName: { type: String, required: true },
  dueDate: { type: Date, required: true },
  complete: { type: Boolean, required: true, default: false },
});

const ProjectModel = mongoose.model("projects", ProjectSchema);
module.exports = ProjectModel;

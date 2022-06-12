const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    taskName: { type: String, required: true },
    completed: {type: Boolean, required: true},
    priority: {
        type: String,
        enum : ['VERY-HIGH', 'HIGH', 'MEDIUM', 'LOW'],
        default: 'MEDIUM',
        required: true,
    },
    dueDate: {type: Date, required: true},
    relatedProject: {type: Schema.Types.ObjectId, ref: "projects"}
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
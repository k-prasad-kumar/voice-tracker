import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  dueDate: { type: Date },

  transcript: { type: String }, // from voice input

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);

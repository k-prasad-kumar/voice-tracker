const Task = require("../models/Task");
const mongoose = require("mongoose");

const VALID_STATUS = ["To Do", "In Progress", "Done"];
const VALID_PRIORITY = ["Low", "Medium", "High"];

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, transcript } =
      req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (priority && !VALID_PRIORITY.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    if (!dueDate) {
      return res.status(400).json({ error: "Due date is required" });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ error: "Invalid due date" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      status: status || "To Do",
      priority: priority || "Medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      transcript: transcript || "",
    });
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.completeTask = async (req, res) => {
  try {
    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    // find existing task and update
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, status, priority, dueDate, transcript } =
      req.body;

    if (status && !VALID_STATUS.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (priority && !VALID_PRIORITY.includes(priority)) {
      return res.status(400).json({ error: "Invalid priority value" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        // description: description,
        priority: priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        // transcript: transcript,
        status: status,
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    // find existing task and delete
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

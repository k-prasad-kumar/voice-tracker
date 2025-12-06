import Task from "../models/Task.js";
import mongoose from "mongoose";
import formError from "../middlewares/formValidator.js";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getCurrentDate = () => {
  // Return the actual current date (2025-12-05) in YYYY-MM-DD format
  return new Date().toISOString().split("T")[0];
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, transcript } =
      req.body;

    const validation = formError(title, status, priority, dueDate);
    if (!validation.success)
      return res.status(400).json({ error: validation.error });

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

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

export const updateTask = async (req, res) => {
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

    const validation = formError(title, status, priority, dueDate);
    if (!validation.success)
      return res.status(400).json({ error: validation.error });

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        transcript: transcript,
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

export const deleteTask = async (req, res) => {
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

export const parseTask = async (req, res) => {
  try {
    const { transcript } = req.body;

    // 1. GET TODAY'S DATE
    const today = getCurrentDate();

    // 2. INITIALIZE MODEL (Already correct)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a task parser. Convert natural language input into task fields.
Always return a valid JSON with no explanation.

# Context
The current date is ${today}. Use this date as the basis for all relative date calculations.

Extract task details from:

"${transcript}"

Format:
{
    "title": "",
    "description": "",
    "priority": "",
    "status": "",
    "dueDate": ""
}
    
Rules:
- Status default: "To Do"
- Priority must be one of: Low, Medium, High
- Parse relative dates like "tomorrow", "next Monday", "in 3 days" into absolute dates in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). **Always use the current date provided in the Context.**
- If no due date found, return empty string
- Title should be the main meaningful task action
- Description can include extra context
- Do NOT include any relative dates
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    const output = result.response.text();

    let json = JSON.parse(output);

    res.json(json);
  } catch (error) {
    console.error("Parsing failed:", error);
    res.status(500).json({ error: "Failed to parse task" });
  }
};

export const filterTasks = async (req, res) => {
  try {
    const { q, priority, status, dueDate } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (priority) {
      query.priority = priority; // e.g., "High"
    }

    if (status) {
      query.status = status; // e.g., "To Do"
    }

    if (dueDate) {
      // If user sends single date → filter exact date only
      const start = new Date(dueDate);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);

      query.dueDate = { $gte: start, $lte: end };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

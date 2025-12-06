import express from "express";
import {
  createTask,
  filterTasks,
  updateTask,
  deleteTask,
  parseTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", createTask);
router.post("/parse-task", parseTask);
router.get("/", filterTasks);
router.put("/:id/update", updateTask);
router.delete("/:id/delete", deleteTask);

export default router;

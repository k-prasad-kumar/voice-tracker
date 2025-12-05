const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/create", createTask);
router.get("/", getTasks);
router.put("/:id/update", updateTask);
router.delete("/:id/delete", deleteTask);

module.exports = router;

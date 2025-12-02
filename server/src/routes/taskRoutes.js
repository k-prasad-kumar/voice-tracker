const express = require("express");
const {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id/complete", completeTask);
router.delete("/:id", deleteTask);

module.exports = router;

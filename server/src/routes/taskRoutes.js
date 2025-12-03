const express = require("express");
const {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/create", createTask);
router.get("/", getTasks);
router.put("/:id/complete", completeTask);
router.delete("/:id/delete", deleteTask);

module.exports = router;

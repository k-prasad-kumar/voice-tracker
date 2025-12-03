const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use(require("./middlewares/errorHandler"));

app.use("/api/tasks", taskRoutes);

module.exports = app;

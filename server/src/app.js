import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use(errorHandler);

app.use("/api/tasks", taskRoutes);

export default app;

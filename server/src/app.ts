import express, { Application } from "express";
import cors from "cors";
// import taskRoutes from "./routes/taskRoutes.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/tasks", taskRoutes);

export default app;

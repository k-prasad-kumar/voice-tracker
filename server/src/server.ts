import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

// Connect DB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

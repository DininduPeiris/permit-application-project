import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import permitRoutes from "./routes/permit-routes.js";
import createPermitTable from "./data/create-permit-table.js";
import errorHandling from "./middlewares/error-handler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", permitRoutes);

// Error handling middleware
app.use(errorHandling);

// Create table before starting server
createPermitTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`The database name is ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});

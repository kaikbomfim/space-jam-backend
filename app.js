import express from "express";
import teamRoutes from "./routes/team.js";
import playerRoutes from "./routes/player.js";
import gameRoutes from "./routes/game.js";
import participationRoutes from "./routes/participation.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import pool from "./config/dbConnect.js"

const app = express();
const port = 8000;

try {
  app.use(express.json());
  await pool();
  app.use(cors({ origin: "*" }));
  app.use("/teams", teamRoutes);
  app.use("/players", playerRoutes);
  app.use("/games", gameRoutes);
  app.use("/participations", participationRoutes);
  console.log("Connected to MongoDB");

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

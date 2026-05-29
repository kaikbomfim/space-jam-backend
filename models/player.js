import mongoose from "mongoose";
import statsSchema from "./stats.js";

const playerSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    favorite_position: { type: String, required: true },
    total_stats: { type: statsSchema, required: true },
  },
  { versionKey: false },
);

const player = mongoose.model("player", playerSchema);
export default player;

import mongoose from "mongoose";
import statsSchema from "./stats.js";

const paymentSchema = new mongoose.Schema(
  {
    completed: { type: Boolean, default: false },
    amount_paid: { type: Number, default: 0 },
    payment_date: { type: Date },
  },
  { _id: false, versionKey: false },
);

const participationSchema = new mongoose.Schema(
  {
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "game",
      required: true,
    },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
      required: true,
    },
    confirmation_date: { type: Date },
    payment: { type: paymentSchema, required: true },
    match_stats: { type: statsSchema, required: true },
  },
  { versionKey: false },
);

const participation = mongoose.model("participation", participationSchema);
export default participation;

import mongoose from "mongoose";

const teamScoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    total_score: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);

const matchSchema = new mongoose.Schema(
  {
    team_1: { type: teamScoreSchema, required: true },
    team_2: { type: teamScoreSchema, required: true },
    team_1_id: { type: mongoose.Schema.Types.ObjectId, ref: "team", required: true },
    team_2_id: { type: mongoose.Schema.Types.ObjectId, ref: "team", required: true },
    result: { type: String, enum: ["time1", "time2"], required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
  },
  { versionKey: false },
);

const playerLimitSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false, versionKey: false },
);

const gameSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    location: { type: String, required: true },
    status: { type: String, enum: ["aberto", "encerrado"], required: true },
    matches: { type: [matchSchema], default: [] },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_value: { type: Number, required: true },
    player_limit: { type: playerLimitSchema, required: true },
  },
  { versionKey: false },
);

const game = mongoose.model("game", gameSchema);
export default game;

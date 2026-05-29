import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
  },
  { versionKey: false },
);

const team = mongoose.model("team", teamSchema);
export default team;

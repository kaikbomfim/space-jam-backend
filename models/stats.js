import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    steals: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false },
);

export default statsSchema;

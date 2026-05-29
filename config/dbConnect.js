import mongoose from "mongoose";

async function pool() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default pool;

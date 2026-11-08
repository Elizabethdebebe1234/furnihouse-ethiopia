
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("MongoDB URI check:", {
  exists: Boolean(MONGODB_URI),
  startsCorrectly:
    MONGODB_URI?.startsWith("mongodb://") ||
    MONGODB_URI?.startsWith("mongodb+srv://"),
  firstCharacters: MONGODB_URI?.slice(0, 15),
});

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectDB;

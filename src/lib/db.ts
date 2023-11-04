import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    console.log("⚡️[db]: Mongodb has been connected");
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    try {
      cached.promise = await mongoose.connect("mongodb://localhost/jishoGPT");
      console.log("⚡️[db]: Mongodb is successfully connected");
    } catch (err) {
      console.log("⚡️[db]: Mongodb connection failed");
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;

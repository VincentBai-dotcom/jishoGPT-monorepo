import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

async function connectToDB() {
  if (cached.connection) {
    console.log("⚡️[db]: Mongodb has been connected");
    return cached.connection;
  }

  if (!cached.promise) {
    // mongoose.set("strictQuery", true);
    try {
      cached.promise = await mongoose.connect(
        process.env.MONGODB_URL || "mongodb://localhost/jishoGPT"
      );
      console.log("⚡️[db]: Mongodb is successfully connected");
    } catch (err) {
      console.log("⚡️[db]: Mongodb connection failed");
    }
  }
  cached.connection = await cached.promise;
  return cached.connection;
}

export default connectToDB;

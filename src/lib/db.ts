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
    console.log("⚡️[db]: Cached MongoDB connection found");
    return cached.connection;
  }

  try {
    if (!cached.promise) {
      mongoose.set("strictQuery", true);
      cached.promise = await mongoose.connect(
        process.env.MONGODB_URL || "mongodb://localhost/jishoGPT"
      );
    }
    cached.connection = await cached.promise;
    console.log("⚡️[db]: Mongodb is successfully connected");
    return cached.connection;
  } catch (err) {
    console.log("⚡️[db]: Mongodb connection failed");
    console.log(err);
  }
}

export default connectToDB;

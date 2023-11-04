import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/jishoGPT");
    console.log("⚡️[db]: Mongodb is successfully connected");
  } catch (err) {
    console.log("⚡️[db]: Mongodb connection failed");
  }
};

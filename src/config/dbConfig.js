import mongoose from "mongoose";

export const connectMongodb = () => {
  try {
    mongoose.set("strictQuery", false);
    const mongoURL = mongoose.connect("mongodb://localhost:27017/crubdb");
    mongoURL && console.log("Mongo connected");
  } catch (error) {
    console.log("error from connectMongoDb");
  }
};

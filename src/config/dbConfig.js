import mongoose from "mongoose";

export const connectMongodb = () => {
  try {
    const mongoURL = process.env.MONGODB_URL;

    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(mongoURL);
    conn && console.log("Mongo connected");
  } catch (error) {
    console.log("error from connectMongoDb");
  }
};

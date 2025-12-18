import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to db succesfully");
};

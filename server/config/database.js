import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Connection is error:", error);
  }
};

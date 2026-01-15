import mongoose from "mongoose"

let isConnected = false

export async function connectDB() {
  if (isConnected) {
    return
  }

  try {
    const uri = process.env.MONGODB_URI

    if (!uri) {
      throw new Error("MONGODB_URI is not defined")
    }

    await mongoose.connect(uri)
    isConnected = true
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

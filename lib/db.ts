import mongoose from "mongoose"

let isConnected = false

export async function connectDB() {
  if (isConnected) {
    return
  }

  try {
    const uri = process.env.MONGODB_URI

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in environment variables. " +
        "Please set it in your .env file or Vercel project settings."
      )
    }

    await mongoose.connect(uri)
    isConnected = true
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

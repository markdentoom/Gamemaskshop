import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`DBError: ${error.message}`)
    process.exit(1) // Exit process with failure
  }
}

export default connectDB

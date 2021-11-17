import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import { errorHandler, notFound } from "./middleware/middleware.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 8000 // We get env from .env

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

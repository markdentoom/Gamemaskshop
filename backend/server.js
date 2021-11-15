import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import products from "./data/products.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

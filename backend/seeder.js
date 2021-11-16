import mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const emptyDB = async () => {
  await Order.deleteMany()
  await Product.deleteMany()
  await User.deleteMany()
}

const destroyData = async () => {
  try {
    await emptyDB()
    console.log("Data destroyed")
    process.exit()
  } catch (error) {
    console.log(`Seeder error: ${error.message}`)
    process.exit(1) // Immediately stop program with error code 1
  }
}

const importData = async () => {
  try {
    await emptyDB()

    // Import users
    const createdUsers = await User.insertMany(users)

    // Set adminUser for all products and import them
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)

    console.log("Data imported")
    process.exit()
  } catch (error) {
    console.log(`Seeder error: ${error.message}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}

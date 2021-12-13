import express from "express"
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js"

const productRoutes = express.Router()

productRoutes.route("/").get(getProducts)
productRoutes.route("/:id").get(getProductById)

export default productRoutes

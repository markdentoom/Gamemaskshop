import express from "express"
import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

const router = express.Router()

// @desc      Fetch all products
// @route     GET /api/products
// @acccess   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // asyncHandler slaps a try/catch around the function it contains
    const products = await Product.find({}) // Empty dict gets all products
    res.json(products)
  })
)

// @desc      Fetch single product
// @route     GET /api/products/:id
// @acccess   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ errorMessage: "Product not found" })
    }
  })
)

export default router

import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { productType } from "../Types"
import { useState, useEffect } from "react"
import axios from "axios"

const HomeScreen = () => {
  // Instantiate products and set it to an empty array
  const [products, setProducts] = useState([])

  // useEffect is triggered the moment the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products")
      setProducts(data)
    }
    fetchProducts()
    // The array below is for setgets that will trigger this function when changed
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: productType) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen

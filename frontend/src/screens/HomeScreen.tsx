import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import products from "../products"
import { productType } from "../Types"


const HomeScreen = () => {
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
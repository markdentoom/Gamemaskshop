import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts, ProductType } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state: any) => state.productList)
  const { loading, error, products } = productList

  // useEffect is triggered the moment the component loads
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]) // The array is for setgets that will trigger this function when changed

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product: ProductType) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen

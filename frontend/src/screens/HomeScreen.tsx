import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { productType } from "../Types"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"

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
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product: productType) => (
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

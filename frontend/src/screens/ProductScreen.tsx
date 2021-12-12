import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProductDetails } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductScreen = (props: { history: any; match: any }) => {
  // TODO quit being lazy and fix type: any
  const { history, match } = props
  const [quantity, setQuantity] = useState(1) // default quantity to 1
  const dispatch = useDispatch()
  const productDetails = useSelector((state: any) => state.productDetails)
  const { loading, error, product } = productDetails

  const isProductInStock = product.countInStock > 0

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // HACK typescript doesn't recognize a stringified number as convertable to number here
    const result = e.target.value as unknown as number
    setQuantity(result)
  }

  const handleSubmit = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {isProductInStock
                        ? `${product.countInStock} left in stock`
                        : "Out of stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {isProductInStock && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={handleQuantityChange}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x: number) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    style={{ width: "100%" }}
                    onClick={handleSubmit}
                    disabled={product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen

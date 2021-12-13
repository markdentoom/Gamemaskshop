import { ReactElement, useEffect } from "react"
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart, CartItemType, removeFromCart } from "../actions/cartActions"
import Message from "../components/Message"

const ProductLink = (props: {
  id: number
  children: string | ReactElement
}) => {
  const { id, children } = props
  return (
    <Link to={`/product/${id}`} className="nostyle">
      {children}
    </Link>
  )
}

const CartScreen = (props: { match: any; location: any; history: any }) => {
  const { match, location, history } = props
  const productId = match.params.id
  // location.search === ?quantity=1
  // get just the quantity number using this ternary
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state: { cart: any }) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const total_items = cartItems.reduce(
    (accumulator: number, item: CartItemType) => accumulator + item.quantity,
    0
  )
  const total_price = cartItems
    .reduce(
      (acc: number, item: CartItemType) => acc + item.quantity * item.price,
      0
    )
    .toFixed(2) // Maximum of two decimals to avoid JS float rounding fails

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    // Go to login if not logged in, else go to shipping
    history.push("/login?redirect=shipping")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            <div>
              Cart is empty. <Link to="/">Go back</Link>
            </div>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item: CartItemType) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col sm={2}>
                    <ProductLink
                      id={item.product}
                      children={
                        <Image src={item.image} alt={item.name} fluid rounded />
                      }
                    />
                  </Col>
                  <Col sm={3}>
                    <ProductLink id={item.product} children={item.name} />
                  </Col>
                  <Col sm={2}>
                    <ProductLink
                      id={item.product}
                      children={`$${item.price}`}
                    />
                  </Col>
                  <Col sm={2}>
                    {/* TODO this Form.control was mostly copied from ProductScreen. Refactor it. */}
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x: number) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal {total_items} items</h2>${total_price}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                style={{ width: "100%" }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen

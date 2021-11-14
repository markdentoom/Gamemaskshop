import { Card } from "react-bootstrap"
import Rating from "../components/Rating"
import { productType } from "../Types"
import { Link } from "react-router-dom"

const Product = (props: { product: productType }) => {
  const { product } = props
  return (
    <Link to={`/product/${product._id}`} className="nostyle">
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="red"
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default Product

import { Card } from "react-bootstrap"

const Product = (props) => {
  const { product } = props
  return (
    <a href={`/product/${product._id}`} class="nostyle">
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <div className="my-3">
              {product.rating} from {product.numReviews} reviews
            </div>
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  )
}

export default Product

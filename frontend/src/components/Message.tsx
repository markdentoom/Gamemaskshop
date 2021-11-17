import { Alert } from "react-bootstrap"

const Message = (props: {
  children: JSX.Element | JSX.Element[]
  variant: string
}) => {
  const { variant, children } = props
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: "info",
}

export default Message

import { ProductType } from "../actions/productActions"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartReducer = (
  state = { cartItems: [] },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem: any = state.cartItems.find(
        (x: { product: ProductType }) => x.product === item.product
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: { product: ProductType }) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: { product: ProductType }) => x.product !== action.payload
        ),
      }
    default:
      return state
  }
}

import { ProductType } from "../actions/productActions"
import { CART_ADD_ITEM } from "../constants/cartConstants"

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
          cartItems: state.cartItems.map((x: { product: any }) =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    default:
      return state
  }
}

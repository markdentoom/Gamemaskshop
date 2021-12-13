import axios from "axios"
import { Dispatch } from "redux"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart =
  (id: number, quantity: number) =>
  async (dispatch: Dispatch<any>, getState: any) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    })
    // Add to local storage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
  }

export type CartItemType = {
  product: number
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

export const removeFromCart =
  (id: number) => (dispatch: Dispatch<any>, getState: any) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
  }

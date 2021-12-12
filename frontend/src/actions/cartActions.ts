import axios from "axios"
import { Dispatch } from "redux"
import { CART_ADD_ITEM } from "../constants/cartConstants"
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants"

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

export const listProducts = () => async (dispatch: any) => {
  try {
    // Start with a request
    dispatch({ type: PRODUCT_LIST_REQUEST })

    // Then dispatch success if we raise no errors
    const { data } = await axios.get("/api/products")
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id: string) => async (dispatch: any) => {
  try {
    // Start with a request
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    // Then dispatch success if we raise no errors
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

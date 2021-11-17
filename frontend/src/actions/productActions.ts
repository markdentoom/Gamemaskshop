import axios from "axios"
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants"

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

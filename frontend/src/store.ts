import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})
const cartItemsFromStorage = localStorage.getItem("cartItems")
const parsedCartItemsFromStorage = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : []

// similar to MST addmodeDefaults
const initialState = {
  productList: undefined,
  productDetails: undefined,
  cart: { cartItems: parsedCartItemsFromStorage },
} as any

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

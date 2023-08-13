import { configureStore, } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";

// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: localStorage.getItem("shippingInfo")
//       ? JSON.parse(localStorage.getItem("shippingInfo"))
//       : {},
//   },
// };

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  // initialState,
});
export default store;

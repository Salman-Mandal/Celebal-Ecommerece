import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import { productDetailsReducer, productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
    // user: userReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
});

export default rootReducer;
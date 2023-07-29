import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import { productDetailsReducer, productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';

const rootReducer = combineReducers({
    // user: userReducer,
    products: productsReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
    cart:cartReducer,
});

export default rootReducer;
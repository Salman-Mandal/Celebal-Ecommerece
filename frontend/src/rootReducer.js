import { combineReducers } from 'redux';
import userReducer from './reducers/userReducers';
import { productDetailsReducer, productsReducer } from './reducers/productReducers';

const rootReducer = combineReducers({
    // user: userReducer,
    products: productsReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
});

export default rootReducer;
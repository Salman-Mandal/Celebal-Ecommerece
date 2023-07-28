import { combineReducers } from 'redux';
// import userReducer from './reducers/userReducers';
import { productsReducer } from './reducers/productReducers';

const rootReducer = combineReducers({
    // user: userReducer,
    products: productsReducer
});

export default rootReducer;
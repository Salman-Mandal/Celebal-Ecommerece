import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";
import axios from "axios"




export const getProduct =
    (keyword = "", currentPage = 1, price = [0, 1000000], category, ratings = 0) =>
        async (dispatch) => {
            try {
                dispatch({ type: ALL_PRODUCT_REQUEST });

                // let link = `http://localhost:5000/api/v1/products`;
                let link = `http://localhost:5000/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

                const { data } = await axios.get(link);

                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: ALL_PRODUCT_FAIL,
                    payload: error.response.data.message,
                });
            }
        };
 
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:5000/api/v1/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
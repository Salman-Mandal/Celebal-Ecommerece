import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "../constants/userConstants";


export const register = (userData) => async (dispatch) => {
  try {

    
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const { data } = await axios.post(`http://localhost:5000/api/v1/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS, payload: data.user
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    console.log("HI tehere agsfjgh");

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Include this option to send cookies
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      withCredentials: true, // Send cookies with the request
    };

    const { data } = await axios.get(`http://localhost:5000/api/v1/me`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    console.log("logout");

    const config = {
      withCredentials: true,
    };

   await axios.get(`http://localhost:5000/api/v1/logout`, config);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};




export const clearError = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
}


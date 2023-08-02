import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from "../constants/userConstants";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/register`,
      userData,
      config
    );

  
    document.cookie = `token=${data.token}; expires=${new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    )}; path=/;`;

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.error.message,
    });
  }
};


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URI}/login`,
      { email, password },
      config
    );

    document.cookie = `token=${data.token}; expires=${new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    )}; path=/;`;

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error.response.data.error.message);
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      withCredentials: true, // Send cookies with the request
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/me`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    console.log("logout");

    const config = {
      withCredentials: true,
    };

    await axios.post(`${process.env.REACT_APP_BACKEND_URI}/logout`, config);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error.message });
  }
};




export const clearError = (email, password) => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
}


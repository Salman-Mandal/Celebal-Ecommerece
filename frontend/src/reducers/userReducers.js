import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOGOUT_REQUEST } from "../constants/userConstants";

const initialState = {
  loading: false,
  user: null,
  isLoggedIn: false,
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loading: true,
      };
    case LOGOUT_REQUEST:
      return {
        state
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        error: '',
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isLoggedIn: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;

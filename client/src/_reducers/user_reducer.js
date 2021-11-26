import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  SAVE_POST,
  GET_POST_BY_ID,
  SAVE_USER,
} from "../_actions/types";

export default function filter(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case SAVE_POST:
      return { ...state, postData: action.payload };
    case SAVE_USER:
      return { ...state, userInfo: action.payload };
    case GET_POST_BY_ID:
      return { ...state, postData: action.payload };
    default:
      return state;
  }
}

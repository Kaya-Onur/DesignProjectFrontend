import * as ACTION from "./constant";
import { login } from "../services/loginService";

export const logoutSuccess = () => {
  return {
    type: ACTION.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTION.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (creds) => {
  return async function (dispatch) {
    const response =await login(creds);
    const authState = {
      ...response.data,
      userPassword: creds.userPassword,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

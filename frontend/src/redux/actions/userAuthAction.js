import { USER_IS_LOGIN } from "../constants";

export const userIsLogin = (isLoggedIn) => ({
  type: USER_IS_LOGIN,
  payload: isLoggedIn,
});
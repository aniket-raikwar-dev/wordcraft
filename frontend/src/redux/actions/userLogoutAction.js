const { USER_LOGOUT } = require("../constants");

export const userLogout = (payload) => ({
  type: USER_LOGOUT,
  payload: payload,
});
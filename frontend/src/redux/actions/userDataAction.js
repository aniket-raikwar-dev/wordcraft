import { USER_DATA } from "../constants";

export const setUserData = (data) => ({
  type: USER_DATA,
  payload: data,
});

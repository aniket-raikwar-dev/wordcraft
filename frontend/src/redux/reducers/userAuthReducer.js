import { USER_IS_LOGIN } from "../constants";

const persistedIsLoggedIn = localStorage.getItem("token") !== null;
const initialState = {
  isLoggedIn: persistedIsLoggedIn || false,
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_IS_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default userAuthReducer;

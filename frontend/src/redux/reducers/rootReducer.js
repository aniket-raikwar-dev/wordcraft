import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import userDataReducer from "./userDataReducer";
import searchTextReducer from "./searchTextReducer";
import { USER_LOGOUT } from "../constants";

const rootReducer = combineReducers({
  auth: userAuthReducer,
  userData: userDataReducer,
  searchData: searchTextReducer,
});

// const rootReducer = (state, action) => {
//   if (action.type === USER_LOGOUT) {
//     return appReducer(undefined, action);
//   }

//   return appReducer(state, action);
// };

export default rootReducer;

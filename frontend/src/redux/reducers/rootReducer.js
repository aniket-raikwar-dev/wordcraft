import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import userDataReducer from "./userDataReducer";
import searchTextReducer from "./searchTextReducer";

const rootReducer = combineReducers({
  auth: userAuthReducer,
  userData: userDataReducer,
  searchData: searchTextReducer,
});

export default rootReducer;

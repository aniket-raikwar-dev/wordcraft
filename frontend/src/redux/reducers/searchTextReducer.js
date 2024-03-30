import { SEARCH_TEXT } from "../constants";

const initialState = {
  text: "",
};

const searchTextReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TEXT:
      return {
        ...state,
        text: action.payload,
      };

    default:
      return state;
  }
};

export default searchTextReducer;

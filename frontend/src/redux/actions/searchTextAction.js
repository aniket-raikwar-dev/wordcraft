import { SEARCH_TEXT } from "../constants";

export const setSearchTextData = (text) => ({
  type: SEARCH_TEXT,
  payload: text,
});

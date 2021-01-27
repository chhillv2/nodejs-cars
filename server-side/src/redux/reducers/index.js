import { combineReducers } from "redux";
import articles from "./articles";
import businesses from "./businesses";
import authors from "./authors";
import topfivepermonth from "./topfivepermonth";

export default combineReducers({
  articles,
  businesses,
  authors,
  topfivepermonth,
});

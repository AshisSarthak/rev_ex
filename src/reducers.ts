import { combineReducers } from "redux";
import homeReducer from "./Home/homeReducer";

export default combineReducers({
  fxRates: homeReducer,
});

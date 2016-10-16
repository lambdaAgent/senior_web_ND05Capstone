import { combineReducers } from "redux";

//reducers
import news from "./news"
import article from "./article"

var Reducers = combineReducers({news, article});

module.exports = Reducers;
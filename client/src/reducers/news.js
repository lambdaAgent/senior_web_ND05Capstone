import {createStore} from "redux";


const news = (state={news_reducers: [], filteredNews: undefined}, action) => {
	switch(action.type){
		case "GET_NEWS":
			return Object.assign({}, state,{news_reducers: action.payload});
		break;

		case "FILTER_NEWS":
			return Object.assign({}, state,{filteredNews: action.payload});
		break;
		case "UNMOUNT":
			return Object.assign({}, state, {filteredNews: undefined})
		break;
		default:
			// console.log("DV reducers")
			return state;
		break;
	}
}

module.exports = news;
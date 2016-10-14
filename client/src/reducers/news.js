import {createStore} from "redux";


const news = (state={news_reducers: [], filteredNews: undefined}, action) => {
	switch(action.type){
		case "GET_NEWS":
			console.log(action)
			return Object.assign({}, state,{news_reducers: action.payload});
		break;

		default:
			// console.log("DV reducers")
			return state;
		break;
	}
}

module.exports = news;
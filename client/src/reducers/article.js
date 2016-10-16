import {createStore} from "redux";


const article = (state={article: undefined}, action) => {
	switch(action.type){
		case "GET_ARTICLE":
			console.log("action reducers", action)
			return Object.assign({}, state,{article: action.payload});
		break;
		case "UNMOUNT":
			return Object.assign({}, state, {article: undefined})
		break;
		default:
			return state;
		break;
	}
}

module.exports = article;
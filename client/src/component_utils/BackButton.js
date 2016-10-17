import React from 'react';
import {Link, browserHistory} from "react-router";
/*
	name: Back button
	function: click to previous page
	props:
	onClick: func.isRequired,
	style: object

*/
const defaultStyle = {
	marginBottom: 40,
	cursor: "pointer",
	fontSize: 25
}
const BackButton = (props) => (
	<span  id="backButton"
		tabIndex="0"
        style={Object.assign({}, defaultStyle, props.style)  }
        onClick={ () => browserHistory.goBack() }
        onKeyDown={(e) => {
        	if(e.keyCode === 13 || e.keyCode ===32){
        		browserHistory.goBack()
        	}
        }}
        >{"< Back"}
        </span>
)

export default BackButton;

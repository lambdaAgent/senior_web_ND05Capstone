import React from "react";

/*
	Floating rounded button
	function: button that is in fixed position;
	props:
	className: string,
	style: string,
	content: string,
	onClick: func,
	role: string
*/

const FloatingButton = (props) => {
	const content = props.content || <span className="fa fa-microphone" style={glyphicon}></span>
	return(
		<div 
		    onClick={props.onClick}
			role={props.role}
			className={"btn btn-lg floating-button no_active" + props.className }
			style={Object.assign({}, props.style)}> 
			{content}
		</div>
	)
};

const glyphicon ={
	position:"absolute", fontSize: 30, top: 8,left:16
}

module.exports = FloatingButton;
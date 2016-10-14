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
		<button 
		    onClick={props.onClick}
			role={props.role}
			className={"btn btn-lg floatingButton no_active" + props.className }
			style={Object.assign({}, defaultStyle, props.style)}> 
			{content}
		</button>
	)
};
const defaultStyle = {
	borderRadius: 200, width:50, height:50,
	color:"white", padding: 0, paddingLeft:4,
	backgroundColor: "#F44336",
	boxShadow: "3px 3px 4px 1px rgba(0,0,0,0.5)",
	position: "fixed",
	bottom: "30px", right: "15px",
	zIndex: 1000
}

const glyphicon ={
	fontSize: 30
}

module.exports = FloatingButton;
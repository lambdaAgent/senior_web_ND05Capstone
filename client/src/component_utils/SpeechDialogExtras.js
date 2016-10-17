import React from "react";


const CloseButton = (props) => {
	return(
	<span 
    	tabIndex="0" aria-label="close speechDialog"
    	className="close-speech-dialog"
        onClick={props.onClick} >
    	<i style={{textAlign: "center", fontSize: 20, marginLeft: "7px"}}>x</i>
    </span>
	)
}

const FooterButton = (props) => {
	
		// const props = this.props;
		return(
		<button 
			tabIndex="0"
		    onClick={props.onClick} onKeyDown={props.onKeyDown}
		    style={Object.assign({}, {backgroundColor: props.clickState ? "#F44336" : "gray",
		    	    color: props.clickState ? "white" : "inherit",
		    		margin: "0 auto", display: "block",
		    		borderRadius: "40px 40px"}, props.style)}
			role={props.role}
			className={"btn btn-lg" + props.className }>
			{props.content}
		</button>		
		)
}

module.exports = {CloseButton, FooterButton}
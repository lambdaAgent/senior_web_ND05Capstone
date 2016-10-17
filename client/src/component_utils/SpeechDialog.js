import React from "react";

import FloatingButton from "./FloatingButton";

class SpeechDialog extends React.Component {
	constructor(props){
		super(props);
		var dialogContent = "Press '?' to show available commands";
		var guideContent= "Voice Commands available for this page are: \n %Go back \n %Read Title \n %Read article."
		this.state = { showDialog: true, listening: false, reading: false, 
			           dialogContent: dialogContent ,
			           guideContent: guideContent,
			           showContent: dialogContent
			       }
	}
	componentDidMount() {
		window.speechSynthesis.cancel()
	}
	componentWillUnmount() {
		window.speechSynthesis.cancel()
	}
	_closeDialog(){
		window.speechSynthesis.cancel()
		this.setState({showDialog: false})
	}
	
	_showDialog(e){
		this.setState({showDialog: true})
	}
	_guideClick(e){
		if(this.state.showContent === this.state.dialogContent){
			this.setState({showContent: this.state.guideContent}) 
		} else if (this.state.showContent === this.state.guideContent){
			this.setState({showContent: this.state.dialogContent})
		}
	}
	_listenClick(e){
		if(!window.annyang) {
			// add "speech recognizer is not ready, you could be offline" to the dialog;
			this.setState({dialogContent: this.state.dialogContent+= "\n speech recognizer is not ready, you could be offline"})
			return;
		}
		if(this.state.listening === true) return undefined;
		var msg = createReadableMessage("listening");
		msg.onend = (e) => {
			//this will start after speech is end, this is a callback
			startAnnyang(window.annyang, this)
			this.setState({listening: true, reading: false});
		}
		//say "listening"
		window.speechSynthesis.speak(msg)
		this.setState({listening: true, dialogContent: this.state.dialogContent+= "\n listening..."})
		//annyang.start

	}
	_stopSpeaking(e){
		window.speechSynthesis.cancel();
		//also when speech hs finished reading, setState speaking to false
		this.setState({reading: false})
	}
	_readArticle(word){
        var speech;
        if(word === "title"){
            speech = this.props.titleContent
        } else if (word === "article"){
            speech = "the article is asdfasdfasfasdfasfd"
        } 

        if(!speech) return undefined;
        var msg = createReadableMessage(speech, this);
		var state = {listening: false, reading: true, dialogContent: this.state.dialogContent += `\n ${speech}`};

		this.setState(Object.assign({}, state,{showContent: this.state.dialogContent}));
		window.speechSynthesis.speak(msg)
	}
	render(){
		const props = this.props;
		const content = props.content || <span className="fa fa-microphone" style={glyphicon}></span>
		
		return(
			<div>
				<panel style={{width: 320, display: this.state.showDialog ? "inherit" : "none",
				             backgroundColor: "white", position: "fixed", right: 10, bottom: 10,
				             zIndex:1000
				             }}>
					<div className="panel panel-danger" style={{margin:0, position:"relative"}}>
					    <div className="panel-heading">
					   		<div style={{display:"inline-block", width: "50%"}}> 
						   		<FooterButton 
								    clickState={this.state.speaking}
								    style={{backgroundColor: "inherit", margin:"0 0"}}
									content={<span className="fa fa-question" style={{fontSize: 30}}></span>}
									onClick={this._guideClick.bind(this)} />
							</div>
							<div style={{display: "inline-block", position:"absolute", right: 10}}>
							<button onClick={this._readArticle.bind(this, "title") }>read title</button>
							<button onClick={this._readArticle.bind(this, "article") }>read article</button>

							<CloseButton 
								onClick={this._closeDialog.bind(this)}
							/>
					        </div>
					    </div>
					    
					    <div className="panel-body" style={{overflowY: ""}}>
					      {/*content of speechDialog*/}
					      {this.state.showContent.split("\n").map((d, index) => {
					      	if (d.indexOf("%") <= 0) {
						      	return <p key={index}>{index + " - " + d}</p>
						    } else {
						      	return <p key={index}>{index + " - " +d.split("%")[0]}<strong>{d.split("%")[1]}</strong></p>
						    }
					      })}
					    </div>

					    <div className="panel-footer" style={{display: "block"}}>
						    <div style={{display: "inline-block", width: "100%"}}>
						    	{this.state.reading ? 
						    	// tab button is trapped to hidden element after this, manually contruct it
						    	// <SpeechDialog />						 must be the last element in every page
					  		 	<FooterButton 
					  		 		clickState={true}
					  		 		onKeyDown={ (e) => (e.target.keyCode === 9) ? this.props.firstElementFocus.focus() : "" }
									content={<span className="fa fa-stop" style={{fontSize: 30}}></span>}
									onClick={this._stopSpeaking.bind(this)} />
						    		:
								<FooterButton 
									clickState={this.state.listening}
					  		 		onKeyDown={ (e) => (e.target.keyCode === 9) ? this.props.firstElementFocus.focus() : "" }
									content={<span className="fa fa-microphone" style={{fontSize: 30}}></span>}
									onClick={this._listenClick.bind(this)} />
						    	}
							</div>
					    </div>
					</div>				
				</panel>
				<FloatingButton 
					onClick={this._showDialog.bind(this)}
					style={{display: this.state.showDialog ? "none" : "inherit"}}/>
			</div>
		)
	}
};
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

const glyphicon ={
	position:"absolute", fontSize: 30, top: 8,left:16
}

module.exports = SpeechDialog;




// -------------
//     LOGIC
// -------------

function startAnnyang(annyang,React, commands){
    if (!window.annyang) return undefined;
    	if(!commands){
    		//if no commands provided, these are default commands available
			commands = {
			    'read *word'(word){
			    	console.log("read ", word)
			        React._readArticle.call(React, word)
			    },
			    'go back'(word) {
			        React.props.extraCommand.goBack()
			    }
			};
		}
		//only addCallback if there is no callback yet
        // annyang.addCallback('start', function() {
        //     console.log("ANNYANG HAS STARTED")
        // })

        annyang.addCallback('result', function(phrases) {
        	var dialog = React.state.dialogContent + `\n I think you might said: % ${phrases[0]}` + `\n But then again, it could be any of the following: % ${phrases} \n`;
        	React.state.dialogContent = dialog
        	React.setState({showContent: React.state.dialogContent  })
        });
        annyang.addCallback('end', function() {
        	annyang.removeCallback('result')
        	annyang.removeCallback('end')
            React.setState({listening: false})
        })

        //attach commands	
        annyang.addCommands(commands);
        // Start listening;
        window.annyang.start({ autoRestart: false , continuous:false});
        // annyang.abort();
}


 const createReadableMessage = (text, React)=>{
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[0]; // Note: some voices don't support altering params
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    // msg.lang = 'en-GB';
    msg.onstart = function(event) {
    }

 	msg.onend = function () {
 		React.setState({reading: false});
	}
    return msg
}

window.createReadableMessage = createReadableMessage;
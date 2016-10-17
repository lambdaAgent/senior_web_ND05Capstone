//library
import React, { Component } from 'react';
import { connect } from "react-redux";
import ArticleAction from "./ArticleAction";
import $ from "jquery";
// import style from "./homeStyle.js";

//components
import Navbar from "../../component_utils/Navbar";
import Loading from "../../component_utils/Loading";
import SearchBar from "../../component_utils/SearchBar";
import SpeechDialog from "../../component_utils/SpeechDialog";
import BackButton from "../../component_utils/BackButton";
import {Link } from "react-router";

var HomeProps;
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Home';
        this.state = {
            width:0,
        	showLeftNavbar: false,
        	showRightNavbar: false
        }
    }
    update(){
        var width = $(window).width();
        this.setState({width: width})
    }
    componentWillMount() {
        // console.log(this.props)
        this.props.getArticle(this.props.params.id);
    }
    componentWillUnmount() {
        this.props.unmountArticle();     
    }
   
    _goBack(){
        
    }
    render() {
    	const props = this.props;
        const state = this.state;
        HomeProps = props
        //if no news, show loading
        if(!props.article){
            return(<div><Navbar /> <Loading /></div>)
        }
        return (
        	<div>
        		<Navbar 
                    LBSymbol={<BackButton />}
                    RBStyle={{visibility: "hidden"}}
                />
        		<main className="container" 
                      style={{}}>
                      <Card news={props.article}/>
                    <SpeechDialog 
                        generateSpeech={generateSpeech}
                        generateCommand={generateCommand}
                        guideContent={"Voice Commands available for this page are: \n %Go back \n %Read Title \n %Read article."}
                        firstElementFocus={$("#backButton")}
                        />
        		</main>
        	</div>
        );
    }
}

const mapStateToProps =  ({article}) => article ;
const mapDispatchToProps = ArticleAction;
module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);


const Card = (props) => {
    const news = props.news;
    const body = news.body.split("\n").map((paragraph,index) => {
        if(paragraph === "undefined") return "";
        return <p key={index} className="card-text">{paragraph}</p>
    })
    return(
    <article className="card">
        <div className="card-block" style={{padding: 20, paddingTop:10, paddingLeft:40}}>
            <h2 className="card-title">{news.title}</h2>
            <h4 className="card-subtitle">{ Date(news.id) }</h4>
        </div>
        <img style={{width:"100%"}} src={news.image.src} alt={news.image.alt} />
        <div className="card-block" style={{padding: 20, paddingRight:40, fontSize:18}}>
            {body}
        </div>
    </article>
    );
}


// =========
//   LOGIC
// =========
function generateCommand(localComponent){
    return {
        'read *word'(word){
            var speech = generateSpeech(word);
            //let localComponent, read this speech, and maintain the lifeCycle of each button
            
            localComponent._readArticle.call(localComponent, speech);
        },
        "go back"(){
            $("#backButton").click();
        }
    }
}

const ExtraButton = (props) => {
    
    return(
        <div style={{display: "inline"}}>
            <button className="btn btn-primary" onClick={props.onClick1}>read title</button>
            <button className="btn btn-primary" onClick={props.onClick2}>read article</button>
        </div>
    )
}

const generateSpeech = (word) => {
    var props = HomeProps;
    var speech;
    console.log("word", word)
    if(word === "title"){
        var intro = "the title of this article is: "
        speech = intro + props.article.title + "\n"
    } else if (word === "article"){
        var intro = "the article is: "
        speech = intro + props.article.body
    } 
    return speech;
}

//library
import React, { Component } from 'react';
import { connect } from "react-redux";
import homeAction from "./homeAction";
import $ from "jquery";
import style from "./homeStyle.js";

//components
import Navbar from "../../component_utils/Navbar";
import Loading from "../../component_utils/Loading";
import SearchBar from "../../component_utils/SearchBar";
import SpeechDialog from "../../component_utils/SpeechDialog";
import {Link } from "react-router";

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
    componentDidMount() {
        window.speechSynthesis.pause()               
    }
    update(){
        var width = $(window).width();
        this.setState({width: width})
    }
    componentWillMount() {
        this.props.fetchNewsOnce();
        this.props.fetchNewsLoop();
        window.addEventListener("resize", this.update.bind(this))
        this.update.call(this);
    }
    componentWillUnmount() {
    	this.props.stopFetching(); 
        this.props.unmountNews(); //clear the state
    }
    componentWillUpdate(nextProps, nextState) {
        // if()
    }
    _onSearchBarChange(word){
        this.props.filterNews(this.props.news_reducers, word);
    }
  
    render() {
    	const props = this.props;
        const state = this.state;
        style.initWidth(state.width);
        //if no news, show loading
        if("news_reducers" in props && props.news_reducers.length === 0 ){
            return(<div><Navbar /> <Loading /></div>)
        }
        const filtered = props.filteredNews || props.news_reducers
        const newsLoop = !Array.isArray(filtered) ? [] : filtered.sort((a,b) => {
            return b.id - a.id
        })
        .map((n,index) => {
            if(index === 0) return(<Card key={index} news={n}/>)
            return(
                <Media key={index} news={n}/>
            )
        });
        return (
        	<div>
        		<Navbar 
                    LBSymbol={<span className="brand">JPost</span>}
                    RBStyle={{visibility: "hidden"}}
                    />
        		<main className="container" 
                      onClick={() => this.setState({showRightNavbar: false})}
                      style={style.main_container}>
                    <SearchBar onChange={this._onSearchBarChange.bind(this)}/>
                    <SpeechDialog />
                    {newsLoop}
        		</main>
        	</div>
        );
    }
}

const mapStateToProps = ( ({news}) => news );
const mapDispatchToProps = homeAction;

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);


const Card = (props) => {
    const news = props.news;
    return(
    <article className="card">
      <Link to={"/article/"+news.id} style={{color: "black"}}>
      
          <div className="card-block" style={{position: "relative"}}>
                <div className="row text-inverse" style={{position: "absolute", width: "100%", left: 20, bottom: 10}}>
                <h4 className="card-title">{news.title}</h4>

                <p className="card-text">{news.description}</p>
                </div>
                <img style={style.main_header_image} src={news.image.src} alt={news.image.alt} />
          </div>
      </Link>
    </article>
    );
}

const Media = (props) => {
    const news = props.news
    return(
        <article className="media">
            <Link to={"/article/"+news.id} style={{color: "black"}}>
              <div className="media-left">
                <img className="media-object" style={style.media_object} src={news.img.src} alt={news.img.alt} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{news.title}</h4>
                {news.description}
              </div>
            </Link>
        </article>
    )
}

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
import FloatingButton from "../../component_utils/FloatingButton";
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
    update(){
        var width = $(window).width();
        this.setState({width: width})
    }
    componentWillMount() {
        this.props.fetchNewsOnce();
        this.props.fetchNewsLoop();
        window.addEventListener("resize", this.update.bind(this))
        this.update.call(this)
    }
    componentWillUnmount() {
    	this.props.stopFetching();
    }
    componentWillUpdate(nextProps, nextState) {
        // if()
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
        const newsLoop = filtered.map((n,index) => {
            if(index === 0) return(<Card key={n.id} news={n}/>)
            return(
                <Media key={n.id} news={n}/>
            )
        })
        return (
        	<div>
        		<Navbar />
        		<main className="container" 
                      style={style.main_container}>
                    <SearchBar />
                    <FloatingButton />
                    {newsLoop}
                    home
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
      <Link to={"/article/?"+news.url} style={{color: "black"}}>
          <div className="card-block">
            <h4 className="card-title text-center">{news.title}</h4>
          </div>
          <div className="card-block">
               <img style={style.main_header_image} src={news.img.src} alt={news.img.alt} />
          </div>
          <div className="card-block">
            <p className="card-text">{news.description}</p>
          </div>
      </Link>
    </article>
    );
}

const Media = (props) => {
    const news = props.news
    return(
        <article className="media">
            <Link to={"/article/?"+news.url} style={{color: "black"}}>
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

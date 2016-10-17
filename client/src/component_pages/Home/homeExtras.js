import React from 'react';
import style from "./homeStyle.js";
import { Link } from "react-router";


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



module.exports = {Card, Media};
import React from 'react';

const Menu = (props) => (
      <button type="button" className="btn btn-lg btn-default" 
              style={{background: "none", border:"none", color:"white"}} 
              aria-label="toggle menu"
              onClick={props.LBAction}>
        <i className="glyphicon glyphicon-cog" style={{fontSize: 25}}></i>
      </button>     
)

const Hamburger = (props) => (
      <button type="button" className="btn btn-lg btn-default" 
              style={{background: "none", border:"none", color:"white"}} 
              aria-label="toggle menu"
              onClick={props.RBAction}>
        <i className="glyphicon glyphicon-menu-hamburger" style={{fontSize: 25}}></i>
      </button>     
)


module.exports = {Menu, Hamburger};

import React from 'react';
const $ = require("jquery");

import { Link } from 'react-router';
import { Menu, Hamburger} from "./NavBarExtras";
/*
  this navbar can contain three child components:
  Elements:
  =========
  1. LBSymbol = LeftBar element => onClick will show LeftCollapsed (a dropdown menu on left)
  2. NavHeader = center element
  3. RBSymbol = RightBar element => onClick will show RightCollapsed (a dropdown menu on left)

  State:
  =====
  This component will not maintain which collapsedMenu is visible, 
  the parent of this component will maintain the controls.
  1. props.showRightMenu  --> if true show rightmenu, if false hide rightMenu
  2. props.showLeftMenu  --> if true show leftMenu, if false hide leftMenu

  onClick:
  ========
  LBAction --> controls click handler of leftElement
  RBAction --> controls click handler of rightElement

  style:
  ======
  RBStyle --> will override the style of rightElement, if the new style match the default style
  LBStyle --> will override the style of leftElement, if the new style match the default style

*/
class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }  

    render() {
        const self = this; //don't Delete this
        const showBackButton = this.props.showBackButton;
        const brand = "Corporate Dashboard";
        const aria_home = 'link to home';
       
        return(
        	<nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">

                <CustomNavbar 
                    NavHeader={self.props.NavHeader}
                    RBSymbol={this.props.RBSymbol || <Hamburger />}
                    RBAria={self.props.RBAria}
                    RBStyle={self.props.RBStyle}
                    RBAction={self.props.RBAction}
                    LBSymbol={this.props.LBSymbol || <Menu />}
                    LBAria={self.props.LBAria}
                    LBStyle={self.props.LBStyle}
                    LBAction={self.props.LBAction}
                  />
                  <CollapsedMenuRight 
                      showRightMenu={this.props.showRightMenu}
                  />
                   <CollapsedMenuLeft 
                      showLeftMenu={this.props.showLeftMenu}
                      content={this.props.CollapsedMenuLeftContent}
                  />
            </div>        
			    </nav>
        )
    }
}


export default Navbar;






const CustomNavbar = (props) => {
    return(
        <ul className="nav nav-tabs nav-justified"style={{width: "100%", color: "white", marginTop: 10}}>
          <div className="text-left"style={Object.assign({}, {width: "30%", display: "inline-block", float:"left"},props.LBStyle )}>
            <li id="LBSymbol" onClick={props.LBAction}>{props.LBSymbol}</li>
          </div>
          <div className="text-center" style={{width: "30%", display: "inline-block"}}>
            <li style={{fontSize: 25, marginTop: 1}}>{props.NavHeader}</li>
          </div>
          <div className="text-right" style={Object.assign({}, {width: "30%", display: "inline-block", float: "right"}, props.RBStyle)}>
            <li id="RBSymbol"  onClick={props.RBAction}>{props.RBSymbol}</li> 
          </div>
        </ul>
    )
}
  // <li aria-label={props.RBAria}
  //     tabIndex={0}
  //     onClick={props.RBAction}
  //     style={Object.assign({}, {fontSize: "25px"}, props.RBStyle)}
  //     >{props.RBSymbol} right</li>

var CollapsedMenuRight = (props) => (
  <div className="navbar-inverse no_active" id="Hamburger-Menu" 
         style={Object.assign({}, {marginTop: 0, display: props.showRightMenu ? "inherit" :"none"})}>
      <ul className="dropdown">
          <li><Link style={dropdownStyle} to="/">Geospatial</Link></li>
          <li><Link style={dropdownStyle} to="/keymetric">KeyMetric</Link></li>
          <li><Link style={dropdownStyle} to="/dataview">DataView</Link></li>
      </ul>
    </div>    
)

CollapsedMenuRight.props = {
    aria_signup: React.PropTypes.string.isRequired  
}
const dropdownStyle={
  color: "white", cursor: "pointer", display:"block", 
  fontSize:20, margin:10, textAlign:"left", marginLeft:10
}

//leftBar is usually a logo, link to home page
var CollapsedMenuLeft = (props) => (
  <div className="navbar-inverse no_active" id="Hamburger-Menu" 
         style={Object.assign({}, {marginTop: 0, display: props.showLeftMenu ? "inherit" :"none"})}>
      <ul className="dropdown" style={dropdownStyle}>
          {props.content}
      </ul>
    </div>    
)
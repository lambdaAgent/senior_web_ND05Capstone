import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	showOptions: false, 
        	options:this.props.data || [],
        	word: ""
        }
    }
    _handleKeyPress(e){
    	if(e.keyPress === 13){
    		this.setState({showOptions: false})
    		return this.props.onEnterPress(e.target.value) || this._change.call(this, e.target.value)
    	} 
    }
    _change(word){
    	this.props.onChange(word)
    }
    render() {
    	const options = this.state.options.map((o,idx) => <option key={idx} value={o}/>)
        return(
        	<div style={{position:'relative', margin: "40px auto", marginTop:5}}>
        		<input 
        		   name="searchbar" aria-labelledBy={this.props["aria-labelledBy"]} 
                   id="searchbar" role="search"
        		   placeholder="type to search" 
        		   list="searchs"
                   className={"search-bar " + this.props.className}
                   style={Object.assign({}, this.props.style)}
        		   onChange={ e =>	this._change.call(this, e.target.value)}
        		   onKeyPress={this._handleKeyPress.bind(this)}
        		   />
                 <i className="glyphicon glyphicon-search" 
                    style={{position: "absolute", left: 7, fontSize: 25,top:7}}></i>
        		 <datalist 
        		 id="searchs">
        			 {options}
        		 </datalist>
        	</div>
        )
    }
}

SearchBar.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    onEnterPress: React.PropTypes.func,
    data: React.PropTypes.array,
    style: React.PropTypes.object,  
    "aria-labelledBy": React.PropTypes.string
}

export default SearchBar;

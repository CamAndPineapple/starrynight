var React = require('react');
var TestContainer = require('./testContainer');
var styles = require(['./css/SearchBar.scss']);


export default React.createClass({
	getInitialState: function() {
		return {
			searchbarValue: "Enter your location",
			newSearch: " "
		}
	},
	clearSearch: function(e) {
		this.setState({
			searchbarValue: " "
		});
	},
	handleInput: function(e) {
		this.setState({
			searchbarValue: e.target.value
		});
	},
	performSearch: function(e) {
		// api call 

		e.preventDefault();
		this.setState({
			newSearch: this.state.searchbarValue
		});
	
	},
	render: function() {
		return (
			<div>
				<TestContainer location={this.state.newSearch} />
				<form className="searchbar-container"  onSubmit={this.performSearch}>
					<input className="searchbar" type="text" 
					value={this.state.searchbarValue} onClick={this.clearSearch} onChange={this.handleInput}  />
					<button className="button--search" type="submit" >Search</button>
				</form>
			</div>
		)
	}
});
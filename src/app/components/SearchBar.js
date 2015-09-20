var React = require('react');
var TestContainer = require('./testContainer');
var styles = require(['./css/SearchBar.scss']);


export default React.createClass({
	getInitialState: function() {
		return {
			searchbarValue: "Enter your location",
			newSearch: " ",
			latitude: " ",
			longitude: " ",
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
		e.preventDefault();
		this.setState({
			newSearch: this.state.searchbarValue
		});
	},
	displayPosition: function(position) {

		this.state.latitude = position.coords.latitude;
		this.state.longitude = position.coords.longitude;

		this.setState({
			latitude: this.state.latitude,
			longitude: this.state.longitude,
		});
	},
	clickGlobeForLocation: function() {

		navigator.geolocation.getCurrentPosition(this.displayPosition, this.displayError);

	},
	
	render: function() {
		return (
			<div>
				<TestContainer location={this.state.newSearch} latitude={this.state.latitude} longitude={this.state.longitude} />
				<form className="searchbar-container"  onSubmit={this.performSearch}>
					<input className="searchbar" type="text" 
					value={this.state.searchbarValue} onClick={this.clearSearch} onChange={this.handleInput}  />
					<button className="button--search" type="submit" >Search</button>
					<span className="fa fa-globe globe" onClick={this.clickGlobeForLocation}></span>
				</form>
			</div>
		)
	}
});
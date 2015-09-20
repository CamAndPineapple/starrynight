var React = require('react');
var TestContainer = require('./testContainer');
var styles = require(['./css/SearchBar.scss']);


export default React.createClass({
	getInitialState: function() {
		return {
			searchbarValue: "Enter your location",
			newSearch: " ",
			city: " ",
			state: " ",
			illumination: " ",
			moonPhase: " ", 
			moonAge: " " 
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
	clickGlobeForLocation: function() {
		var self = this;
		$.ajax({
			type: "get",
			url: "http://api.wunderground.com/api/42e0777a5e56eeaf/geolookup/q/autoip.json",
			dataType: "jsonp",
			success: function(parsed_json) {
				var latitude = parsed_json["location"]["lat"];
				var longitude = parsed_json["location"]["lon"];
				$.ajax({
					type: "get",
					url: "http://api.wunderground.com/api/42e0777a5e56eeaf/geolookup/conditions/astronomy/forecast/q/" + latitude + "," + longitude + ".json",
					dataType: "jsonp",
					success: function(parsed_json) {
						self.state.city = parsed_json["location"]["city"];
						self.state.state = parsed_json["location"]["state"];
						self.state.illumination = parsed_json['moon_phase']['percentIlluminated'];
						self.state.moonPhase = parsed_json['moon_phase']['ageOfMoon'];
						self.state.moonAge = parsed_json['moon_phase']['phaseofMoon'];

						self.setState({
								city: self.state.city + ',',
								state: self.state.state,
								illumination: self.state.illumination,
								moonPhase: self.state.moonPhase,
								moonAge: self.state.moonAge
						});
					}
				});
			}

		});

		

	},
	
	render: function() {
		return (
			<div>
				<TestContainer location={this.state.newSearch} city={this.state.city} state={this.state.state}  illumination={this.state.illumination} moonPhase={this.state.moonPhase} moonAge={this.state.moonAge}  />
				<form className="searchbar-container"  onSubmit={this.performSearch}>
					<input className="searchbar"  id="searchTextField" type="text" 
					value={this.state.searchbarValue} onClick={this.clearSearch} onChange={this.handleInput}  />
					<button className="button--search" type="submit" >Search</button>
					<span className="fa fa-globe globe" onClick={this.clickGlobeForLocation}></span>
				</form>
			</div>
		)
	}
});
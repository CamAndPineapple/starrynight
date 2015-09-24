var React = require('react');
var TestContainer = require('./testContainer');
var MoonPhaseContainer = require('./MoonPhaseContainer');
var TitleContainer = require('./TitleContainer');
var styles = require(['./css/SearchBar.scss']);


export default React.createClass({
	arrayOfMoonPhaseImg: {
		WaxingCrescent: "/img/waxing_crescent.png",
		FirstQuarter: "/img/first_quarter.png",
		WaxingGibbous: "/img/waxing_gibbous.png",
		FullMoon: "/img/full_moon.png",
		WaningGibbous: "/img/waning_gibbous.png",
		LastQuarter: "/img/last_quarter.png",
		WaningCrescent: "/img/waning_crescent.png"

	},
	getInitialState: function() {
		return {
			showTestContainerWrapper: false,
			showTitleContainer: true,
			searchbarValue: "Enter your location",
			captureSearchEvent: " ",
			city: " ",
			state: " ",
			illumination: " ",
			moonPhase: " ", 
			moonAge: " ",
			img: "/img/placeholder.jpg" 
		}
	},
	clearSearch: function(e) {
		this.setState({
			searchbarValue: " "
		});
	},

	searchbarSearch: function(e) {
		var self = this;
		e.preventDefault();
		var API_KEY = "42e0777a5e56eeaf";
		var inputValue = document.getElementById("searchTextField").value;
		var city = inputValue.split(", ")[0];
		var state = inputValue.split(", ")[1];
		
		this.setState({
			searchbarValue: inputValue,
			showTestContainerWrapper: true,
			showTitleContainer: false
		});
	
		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + state + "/" + city + ".json",
			dataType: "jsonp",
			success: function(parsed_json) {
				self.state.city = parsed_json["location"]["city"];
				self.state.state = parsed_json["location"]["state"];
				self.state.illumination = parsed_json['moon_phase']['percentIlluminated'];
				self.state.moonPhase = parsed_json['moon_phase']['phaseofMoon'];
				self.state.moonAge = parsed_json['moon_phase']['ageOfMoon'];
				var moonPhaseClipped = self.state.moonPhase.split(' ').join('');
				var moonPhaseImg = self.arrayOfMoonPhaseImg[moonPhaseClipped];
		
				

				self.setState({
						city: self.state.city + ',',
						state: self.state.state,
						illumination: self.state.illumination,
						moonPhase: self.state.moonPhase,
						moonAge: self.state.moonAge,
						img: moonPhaseImg
				});
			}
		});


		
	},
	clickGlobeForLocation: function() {
		var API_KEY = "42e0777a5e56eeaf";
		var self = this;
		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/q/autoip.json",
			dataType: "jsonp",
			success: function(parsed_json) {
				var latitude = parsed_json["location"]["lat"];
				var longitude = parsed_json["location"]["lon"];
				$.ajax({
					type: "get",
					url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + latitude + "," + longitude + ".json",
					dataType: "jsonp",
					success: function(parsed_json) {
						self.state.city = parsed_json["location"]["city"];
						self.state.state = parsed_json["location"]["state"];
						self.state.illumination = parsed_json['moon_phase']['percentIlluminated'];
						self.state.moonPhase = parsed_json['moon_phase']['phaseofMoon'];
						self.state.moonAge = parsed_json['moon_phase']['ageOfMoon'];
						var moonPhaseClipped = self.state.moonPhase.split(' ').join('');
						var moonPhaseImg = self.arrayOfMoonPhaseImg[moonPhaseClipped];

						self.setState({
								showTestContainerWrapper: true,
								showTitleContainer: false,
								city: self.state.city + ',',
								state: self.state.state,
								illumination: self.state.illumination,
								moonPhase: self.state.moonPhase,
								moonAge: self.state.moonAge,
								img: moonPhaseImg
						});
					}
				});
			}

		});

		

	},
	
	render: function() {
		return (
			<div>
					{this.state.showTitleContainer ? <TitleContainer /> : null }
					{this.state.showTestContainerWrapper ? <div className="test-container-wrapper">
					<TestContainer location={this.state.newSearch} city={this.state.city} state={this.state.state}  illumination={this.state.illumination} moonPhase={this.state.moonPhase} moonAge={this.state.moonAge} /> 
					<MoonPhaseContainer src={this.state.img} />
					</div> : null }
					<form className="searchbar-container" onSubmit={this.searchbarSearch} value={this.state.searchbarValue}>
						<input className="searchbar"  id="searchTextField" type="text" size="3"
						 onClick={this.clearSearch} />
						<button className="button--search" type="submit" >Search</button>
						<span className="fa fa-globe globe" onClick={this.clickGlobeForLocation}></span>
					</form>
			</div>
		)
	}
});
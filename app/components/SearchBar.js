var React = require('react');
var TestContainer = require('./testContainer');
var MoonPhaseContainer = require('./MoonPhaseContainer');
var TitleContainer = require('./TitleContainer');
var ForecastMessageContainer = require('./ForecastMessageContainer');
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
	arrayOfForecastMessages: {
		perfect: "perfect",
		good: "good",
		neutral: "neutral",
		lousy: "lousy",
		horrible: "horrible",
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
			clouds: " ",
			img: "/img/placeholder.jpg",
			forecastMessage: " "
		}
	},

	clearSearch: function(e) {
		this.setState({
			searchbarValue: " ",
			city: " ",
			state: " ",
			illumination: " ",
			moonPhase: " ", 
			moonAge: " ",
			clouds: " ",
			forecastMessage: " "
		});
	},

	searchbarSearch: function(e) {
		var self = this;
		e.preventDefault();
		var API_KEY = "42e0777a5e56eeaf";
		var API_KEY_DS = "f";
		var inputValue = document.getElementById("searchTextField").value;
		var city = inputValue.split(", ")[0];
		var state = inputValue.split(", ")[1];
		
		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + state + "/" + city + ".json",
			dataType: "jsonp",
			success: function(parsed_json) {

				var moonPhaseVar = parsed_json['moon_phase']['phaseofMoon'];
				var moonAgeVar = parsed_json['moon_phase']['ageOfMoon'];
				var moonPhaseClipped = moonPhaseVar.split(' ').join('');
				var illuminationPercentage = parsed_json['moon_phase']['percentIlluminated'];
		
				self.setState({
						searchbarValue: inputValue,
						showTestContainerWrapper: true,
						showTitleContainer: false,
						city: parsed_json["location"]["city"] + ',',
						state: parsed_json["location"]["state"],
						illumination: parsed_json['moon_phase']['percentIlluminated'],
						moonPhase: parsed_json['moon_phase']['phaseofMoon'],
						moonAge: parsed_json['moon_phase']['ageOfMoon'],
						img: self.arrayOfMoonPhaseImg[moonPhaseClipped]
				});
			}
		});
		$.ajax({
			type: "get",
			url: 'http://api.openweathermap.org/data/2.5/forecast/' + city + '?id=524901&APPID=1111111111',
			success: function(parsed_json) {

				var cloudPercentage = parsed_json['list'][0]['clouds']['all'];
				var message;

				

				if (cloudPercentage >= 80) {
					message = self.arrayOfForecastMessages["horrible"];
				} else if (cloudPercentage >= 60) {
					message = self.arrayOfForecastMessages["lousy"];
				} else if (cloudPercentage >= 40) {
					message = self.arrayOfForecastMessages["neutral"];
				} else if (cloudPercentage >= 10) {
					message = self.arrayOfForecastMessages["good"];
				} else if (cloudPercentage >= 0) {
					message = self.arrayOfForecastMessages["perfect"];
				} 

				self.setState({
						clouds: cloudPercentage,
						forecastMessage: message
				});

				
			}
		});


		
	},
	clickGlobeForLocation: function() {
		var API_KEY = "42e0777a5e56eeaf";
		var API_KEY_FIO = "e9a70b3c8567afd2b17b50b9699f6a24";
		var self = this;
		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/q/autoip.json",
			dataType: "jsonp",
			success: function(parsed_json) {
				var LATITUDE = parsed_json["location"]["lat"];
				var LONGITUDE = parsed_json["location"]["lon"];

				$.when(

					$.get("https://api.forecast.io/forecast/" + API_KEY_FIO + "/" + LATITUDE + "," + LONGITUDE, function(parsed_json) {
						// get cloud cover which comes as a decimal between 0 and 1
						var cloudCoverage = 100 * parsed_json["currently"]["cloudCover"];
						alert(cloudCoverage);


					}),


					$.get("https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + LATITUDE + "," + LONGITUDE + ".json", function(parsed_json) {
						var moonPhaseVar = parsed_json['moon_phase']['phaseofMoon'];
						var moonAgeVar = parsed_json['moon_phase']['ageOfMoon'];
						var moonPhaseClipped = moonPhaseVar.split(' ').join('');
						var illuminationPercentage = parsed_json['moon_phase']['percentIlluminated'];

						self.setState({
							searchbarValue: inputValue,
							showTestContainerWrapper: true,
							showTitleContainer: false,
							city: parsed_json["location"]["city"] + ',',
							state: parsed_json["location"]["state"],
							illumination: parsed_json['moon_phase']['percentIlluminated'],
							moonPhase: parsed_json['moon_phase']['phaseofMoon'],
							moonAge: parsed_json['moon_phase']['ageOfMoon'],
							img: self.arrayOfMoonPhaseImg[moonPhaseClipped]
						});
					})


				).then(function() {
					alert("finished!");



				});
			}



		});



		// 	$.ajax({
		// 		type: "get",
		// 		url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + latitude + "," + longitude + ".json",
		// 		dataType: "jsonp",
		// 		success: function(parsed_json) {

		// 		var moonPhaseVar = parsed_json['moon_phase']['phaseofMoon'];
		// 		var moonAgeVar = parsed_json['moon_phase']['ageOfMoon'];
		// 		var moonPhaseClipped = moonPhaseVar.split(' ').join('');

		// 		self.setState({
		// 			searchbarValue: inputValue,
		// 			showTestContainerWrapper: true,
		// 			showTitleContainer: false,
		// 			city: parsed_json["location"]["city"] + ',',
		// 			state: parsed_json["location"]["state"],
		// 			illumination: parsed_json['moon_phase']['percentIlluminated'],
		// 			moonPhase: parsed_json['moon_phase']['phaseofMoon'],
		// 			moonAge: parsed_json['moon_phase']['ageOfMoon'],
		// 			img: self.arrayOfMoonPhaseImg[moonPhaseClipped]
		// 		});
		// 		}
		// 	});
		// }



	},
	
	render: function() {
		return (
			<div>	
					{this.state.showTitleContainer ? <TitleContainer /> : null }

					{this.state.showTestContainerWrapper ? <div className="test-container-wrapper">
					<ForecastMessageContainer forecastMessage={this.state.forecastMessage} />
					<TestContainer location={this.state.newSearch} city={this.state.city} state={this.state.state}  illumination={this.state.illumination} moonPhase={this.state.moonPhase} moonAge={this.state.moonAge} clouds={this.state.clouds} /> 
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
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
		// "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + state + "/" + city + ".json"
	},

	searchbarSearch: function(e) {
		e.preventDefault();
		var API_KEY = "42e0777a5e56eeaf";
		var API_KEY_FIO = "e9a70b3c8567afd2b17b50b9699f6a24";
		var self = this;
		var inputValue = document.getElementById("searchTextField").value;
		var cloudPercentage;
		var cloudWeighted;
		var illumPercentage;
		var illumWeighted;
		var cloudWeight = 0.80;
		var illumWeight = 0.20;

		var city = inputValue.split(", ")[0];
		var state = inputValue.split(", ")[1];
		
		this.setState({
			searchbarValue: inputValue
		});

		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + state + "/" + city + ".json",
			dataType: "jsonp",
			success: function(parsed_json) {
				var LATITUDE = parsed_json["location"]["lat"];
				var LONGITUDE = parsed_json["location"]["lon"];

				$.ajax({
					type: "get",
					url: "https://api.forecast.io/forecast/" + API_KEY_FIO + "/" + LATITUDE + "," + LONGITUDE,
					dataType: "jsonp",
					success: function(parsed_json) {


						// get cloud cover which comes as a decimal between 0 and 1
						cloudPercentage = 100 * parsed_json["currently"]["cloudCover"];

						if (cloudPercentage >= 80) {
							cloudWeighted = 1 * cloudWeight;
						} else if (cloudPercentage >= 60) {
							cloudWeighted = 2 * cloudWeight;
						} else if (cloudPercentage >= 40) {
							cloudWeighted = 3 * cloudWeight;
						} else if (cloudPercentage >= 10) {
							cloudWeighted = 4 * cloudWeight;
						} else if (cloudPercentage >= 0) {
							cloudWeighted = 5 * cloudWeight;
						}


						self.setState({
							clouds: cloudPercentage
						});

					}



				});



				$.ajax({
					type: "get",
					url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + LATITUDE + "," + LONGITUDE + ".json",
					dataType: "jsonp",
					success: function(parsed_json) {

						var moonPhaseVar = parsed_json['moon_phase']['phaseofMoon'];
						var moonAgeVar = parsed_json['moon_phase']['ageOfMoon'];
						var moonPhaseClipped = moonPhaseVar.split(' ').join('');

						illumPercentage = parsed_json['moon_phase']['percentIlluminated'];


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


						if (illumPercentage >= 80) {
							illumWeighted = 1 * illumWeight
						} else if (illumPercentage >= 60) {
							illumWeighted = 2 * illumWeight
						} else if (illumPercentage >= 40) {
							illumWeighted = 3 * illumWeight
						} else if (illumPercentage >= 10) {
							illumWeighted = 4 * illumWeight
						} else if (illumPercentage >= 0) {
							illumWeighted = 5 * illumWeight
						}


					}
				});


			}
		});

setTimeout(function(){ 
			var weightedAvg = cloudWeighted + illumWeighted;
			var msg;

			console.log(cloudWeighted);
			console.log(illumWeighted);


			if (weightedAvg >= 4) {
				msg = self.arrayOfForecastMessages["perfect"];
			} else if (weightedAvg >= 3) {
				msg = self.arrayOfForecastMessages["good"];
			} else if (weightedAvg >= 2) {
				msg = self.arrayOfForecastMessages["neutral"];
			} else if (weightedAvg >= 1) {
				msg = self.arrayOfForecastMessages["lousy"];
			} else if (weightedAvg >= 0) {
				msg = self.arrayOfForecastMessages["horrible"];
			}

			self.setState({
			
				forecastMessage: msg
			});



}, 3000);

},
	clickGlobeForLocation: function() {
		var API_KEY = "42e0777a5e56eeaf";
		var API_KEY_FIO = "e9a70b3c8567afd2b17b50b9699f6a24";
		var self = this;
		var inputValue = document.getElementById("searchTextField").value;
		var cloudPercentage;
		var cloudWeighted;
		var illumPercentage;
		var illumWeighted;
		

		$.ajax({
			type: "get",
			url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/q/autoip.json",
			dataType: "jsonp",
			success: function(parsed_json) {
				var LATITUDE = parsed_json["location"]["lat"];
				var LONGITUDE = parsed_json["location"]["lon"];

				$.ajax({
					type: "get",
					url: "https://api.forecast.io/forecast/" + API_KEY_FIO + "/" + LATITUDE + "," + LONGITUDE,
					dataType: "jsonp",
					success: function(parsed_json) {

						
								// get cloud cover which comes as a decimal between 0 and 1
								cloudPercentage = 100 * parsed_json["currently"]["cloudCover"];

						if (cloudPercentage >= 80) {
							cloudWeighted = 1 * cloudWeight;
						} else if (cloudPercentage >= 60) {
							cloudWeighted = 2 * cloudWeight;
						} else if (cloudPercentage >= 40) {
							cloudWeighted = 3 * cloudWeight;
						} else if (cloudPercentage >= 10) {
							cloudWeighted = 4 * cloudWeight;
						} else if (cloudPercentage >= 0) {
							cloudWeighted = 5 * cloudWeight;
						}


						self.setState({
							clouds: cloudPercentage
						});

							}

					


						});

				




				$.ajax({
					type: "get",
					url: "https://api.wunderground.com/api/" + API_KEY + "/geolookup/conditions/astronomy/forecast/q/" + LATITUDE + "," + LONGITUDE + ".json",
					dataType: "jsonp",
					success: function(parsed_json) {

						var moonPhaseVar = parsed_json['moon_phase']['phaseofMoon'];
						var moonAgeVar = parsed_json['moon_phase']['ageOfMoon'];
						var moonPhaseClipped = moonPhaseVar.split(' ').join('');
						
						illumPercentage = parsed_json['moon_phase']['percentIlluminated'];


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
						

						if (illumPercentage >= 80) {
							illumWeighted = 1 * illumWeight
						} else if (illumPercentage >= 60) {
							illumWeighted = 2 * illumWeight
						} else if (illumPercentage >= 40) {
							illumWeighted = 3 * illumWeight
						} else if (illumPercentage >= 10) {
							illumWeighted = 4 * illumWeight
						} else if (illumPercentage >= 0) {
							illumWeighted = 5 * illumWeight
						}

						
							}
						});

		
}})

setTimeout(function(){ 
			var weightedAvg = cloudWeighted + illumWeighted;
			var msg;



			if (weightedAvg >= 0) {
				msg = self.arrayOfForecastMessages["horrible"];
			} else if (weightedAvg >= 1) {
				msg = self.arrayOfForecastMessages["lousy"];
			} else if (weightedAvg >= 2) {
				msg = self.arrayOfForecastMessages["neutral"];
			} else if (weightedAvg >= 3) {
				msg = self.arrayOfForecastMessages["good"];
			} else if (weightedAvg >= 4) {
				msg = self.arrayOfForecastMessages["perfect"];
			}

			self.setState({
			
				forecastMessage: msg
			});



}, 3000);


},

		



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
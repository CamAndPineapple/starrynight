$(function() {

	// cacheDOM
	var $city = $("#city");
	var $state = $("#state");
	var $country = $("#country");
	var $temp = $("#temp");

	$(".search-form").on("submit", function(event) {
		event.preventDefault();
		var $input = $(this).serializeArray();
		var $newInput = $input[0]["value"];
		console.log($newInput);

			$.get( "http://api.wunderground.com/api/42e0777a5e56eeaf/forecast/geolookup/conditions/q/MD/" + $newInput + ".json", function( parsed_json ) {
				var city = parsed_json['location']['city'];
				var state = parsed_json['location']['state'];
				var country = parsed_json['location']['country_name'];
				var temp =  parsed_json['forecast']['simpleforecast']['forecastday'][0]['high']['fahrenheit'];
				$city.append(city);
				$state.append(state);
				$country.append(country);
				$temp.append(temp);

			});
	});



	



}());
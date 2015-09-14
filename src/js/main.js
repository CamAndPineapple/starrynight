$(function() {

	// cacheDOM
	var $state = $("#state");
	var $country = $("#country");

	$(".search-form").on("submit", function(event) {
		event.preventDefault();
		var $input = $(this).serializeArray();
		var $newInput = $input[0]["value"];
		console.log($newInput);

			$.get( "http://api.wunderground.com/api/42e0777a5e56eeaf/forecast/geolookup/conditions/q/CA/" + $newInput + ".json", function( parsed_json ) {
				var city = parsed_json['location']['city'];
				var country = parsed_json['location']['country_name'];
				$state.append(city);
				$country.append(country);

			});
	});



	



}());
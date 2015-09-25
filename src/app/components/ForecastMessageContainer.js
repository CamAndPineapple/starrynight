var React = require('react');
var styles = require(['./css/ForecastMessageContainer.scss']);


export default React.createClass({
	render: function() {
		var spanStyle = {
			color: '#40C368',
			fontWeight: bold
		};

		return (
			<div className="forecast-message-container">
			<h1> The visibility of stars tonight will be <span style={spanStyle}>{this.props.forecastMessage}</span>! </h1>
			</div>
		)
	}
});
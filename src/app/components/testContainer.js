var React = require('react');
var styles = require(['./css/testContainer.scss']);



export default React.createClass({
	render: function() {
		var spanStyle = {
			color: '#fff'
		};

		return (
			<div className="test-container">
				<h1>Location: <span style={spanStyle}>{this.props.location}</span></h1>
				<h2>latitude: <span style={spanStyle}>{this.props.latitude}</span></h2>
				<h2>longitude: <span style={spanStyle}>{this.props.longitude}</span></h2>
			</div>
		)
	}
});
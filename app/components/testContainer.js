var React = require('react');
var styles = require(['./css/testContainer.scss']);



export default React.createClass({
	render: function() {
		var spanStyle = {
			color: '#fff'
		};

		return (
			<div>
				<div className="test-container">
					<h2>City: <span style={spanStyle}>{this.props.city} {this.props.state}</span></h2>
					<h2>Cloudiness: <span style={spanStyle}>{this.props.clouds} </span>%</h2>
					<h2>Moon Illumination: <span style={spanStyle}>{this.props.illumination}</span>%</h2>
					<h2>Moon Phase: <span style={spanStyle}>{this.props.moonPhase}</span></h2>
					<h2>Moon Age: <span style={spanStyle}>{this.props.moonAge}</span></h2>
				</div>
			</div>
		)
	}
});
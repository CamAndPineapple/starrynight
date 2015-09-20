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
				<h2>city: <span style={spanStyle}>{this.props.city}</span></h2>
				<h2>state: <span style={spanStyle}>{this.props.state}</span></h2>
			</div>
		)
	}
});
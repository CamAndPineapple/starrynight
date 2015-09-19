var React = require('react');
var styles = require(['./css/testContainer.scss']);



export default React.createClass({
	render: function() {
		var spanStyle = {
			color: '#fff'
		};
		return (
			<div className="test-container">
			<h1>Location: <span style={spanStyle}>{this.props.location}</span> </h1>
			</div>
		)
	}
});
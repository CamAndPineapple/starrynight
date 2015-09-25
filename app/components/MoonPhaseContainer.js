var React = require('react');
var styles = require(['./css/MoonPhaseContainer.scss']);

export default React.createClass({
	render: function () {
		return (
			<div className="moonphase-img-container">
			<img id="moonphase-img" src={this.props.src} />
			</div>
		);
		
	}
});

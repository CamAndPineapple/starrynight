var React = require('react');


export default React.createClass({
 render: function() {
		var containerStyle = {
			marginTop: '578px',
			backgroundColor: '#fff'
		};
		var searchbarStyle = {
			height: '30px',
			width: '400px',

		};
		return (
			<div className="searchbar-container" style={containerStyle}>
			<input className="searchbar" style={searchbarStyle} type="text" value="Find your location" />
			<button type="submit">Search</button>
			</div>
		)
	}
});
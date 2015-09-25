var React = require('react');
var SearchBar = require('./components/SearchBar')


var App = React.createClass({
	render: function() {
		return (
			<div>
			<SearchBar />
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));
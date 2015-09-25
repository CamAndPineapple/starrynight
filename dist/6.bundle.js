webpackJsonp([6],{

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(175);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(162)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./SearchBar.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./SearchBar.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(161)();
	// imports


	// module
	exports.push([module.id, "/* ----------------------------------------\n   \tSearchbar - Parent of [testContainer]\t\n-------------------------------------------*/\n/* ----------------------------------------\n   \tGlobals - included w/ all components\t\n-------------------------------------------*/\nbody {\n  font-family: 'Lato', sans-serif;\n  letter-spacing: 1px; }\n\n* {\n  outline: none; }\n\n/* Colors */\n.test-container-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n\n.searchbar-container {\n  text-align: center; }\n\n.searchbar {\n  height: 30px;\n  width: 300px; }\n\n.button--search {\n  height: 36px;\n  width: 140px;\n  color: #fff;\n  background-color: #FF5722;\n  border: none; }\n  .button--search:hover {\n    background-color: #ee3900; }\n\n.globe {\n  position: relative;\n  top: 8px;\n  color: #0056FF;\n  margin-left: 17px;\n  font-size: 34px; }\n  .globe:hover {\n    color: #fff; }\n\n.pac-container {\n  height: 90px; }\n", ""]);

	// exports


/***/ }

});
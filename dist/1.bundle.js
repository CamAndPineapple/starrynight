webpackJsonp([1],{

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(160);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(162)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./testContainer.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./testContainer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(161)();
	// imports


	// module
	exports.push([module.id, "/* ----------------------------------------\n   \ttestContainer - child of [SearchBar]\t\n-------------------------------------------*/\n/* ----------------------------------------\n   \tGlobals - included w/ all components\t\n-------------------------------------------*/\nbody {\n  font-family: 'Lato', sans-serif;\n  letter-spacing: 1px; }\n\n* {\n  outline: none; }\n\n/* Colors */\n.test-container {\n  flex: 1 0 50%;\n  padding: 30px 0px 30px 30px;\n  margin-top: 40px;\n  margin-bottom: 185px;\n  height: 250px;\n  width: 400px;\n  background-color: rgba(0, 0, 0, 0.68);\n  color: #00D8FF; }\n  .test-container h1 {\n    font-weight: 300; }\n", ""]);

	// exports


/***/ }

});
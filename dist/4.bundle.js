webpackJsonp([4],{

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(168);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(162)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./TitleContainer.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./TitleContainer.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(161)();
	// imports


	// module
	exports.push([module.id, "/* ----------------------------------------\n\tTitleContainer - child of [SearchBar]\t\n-------------------------------------------*/\n/* ----------------------------------------\n   \tGlobals - included w/ all components\t\n-------------------------------------------*/\nbody {\n  font-family: 'Lato', sans-serif;\n  letter-spacing: 1px; }\n\n* {\n  outline: none; }\n\n/* Colors */\n.title-container {\n  display: flex;\n  align-items: flex-end;\n  margin-top: 40px;\n  margin-bottom: 287px;\n  height: 260px;\n  text-align: center;\n  color: #fff; }\n  .title-container h1 {\n    font-size: 80px;\n    letter-spacing: 30px;\n    font-weight: 300; }\n", ""]);

	// exports


/***/ }

});
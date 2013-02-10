/**
 * ui.js
 */

APPYARD.define('APPYARD.UI');

APPYARD.UI = function () {
	
	// dependencies
	
	// private properties
	
	// private methods
	var width = function () {
		return $(window).width();
	};
	
	var height = function () {
		return $(window).height();
	};
	
	// optional one-time init procedures
	
	// public properties and methods
	return {
		width: width,
		height: height
	};
	
}();

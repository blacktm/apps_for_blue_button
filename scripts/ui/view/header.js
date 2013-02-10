/**
 * Header.js
 */

APPYARD.define('APPYARD.UI.View.Header');

APPYARD.UI.View.Header = function () {
	
	// dependencies
	var view = APPYARD.UI.View;
	
	// private properties
	
	// private methods
	var add = function (content) {
		view.addDiv({ id: 'view-header' });
		$('#view-header').append(content);
	};
	
	// optional one-time init procedures
	
	// public properties and methods
	return {
		add: add
	};
	
}();

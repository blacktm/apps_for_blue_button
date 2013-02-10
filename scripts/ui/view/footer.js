/**
 * footer.js
 */

APPYARD.define('APPYARD.UI.View.Footer');

APPYARD.UI.View.Footer = function () {
	
	// dependencies
	var view = APPYARD.UI.View;
	
	// private properties
	
	// private methods
	var add = function (content) {
		view.addDiv({ id: 'view-footer' });
		$('#view-footer').append(content);
	};
	
	// optional one-time init procedures
	
	// public properties and methods
	return {
		add: add
	};
	
}();

/**
 * content.js
 */

APPYARD.define('APPYARD.UI.View.Content');

APPYARD.UI.View.Content = function () {
	
	// dependencies
	var view = APPYARD.UI.View;
	
	// private properties
	
	// private methods
	var add = function (content) {
		view.addDiv({ id: 'view-content' });
		$('#view-content').append(content);
	};
	
	var maxHeight = function (h) {
		$('#view-content').css('max-height', h);
	};
	
	var append = function (content) {
		$('#view-content').append(content);
	};
	
	// optional one-time init procedures
	
	// public properties and methods
	return {
		add: add,
		maxHeight: maxHeight,
		append: append
	};
	
}();

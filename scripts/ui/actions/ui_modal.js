/**
 * ui_modal_info.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_modal');

APPYARD.UI.Actions.ui_modal = function () {
	
	// dependencies
	var ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;
	
	// private properties
	
	// private methods
	var run = function (properties) {
		
		view.Header.add(properties.title);
		view.Content.add(properties.content);
		view.Footer.add(view.Button.modal);
		
		// Set the height
		if (properties.height) {
			view.Content.maxHeight(properties.height);
		} else {
			view.Content.maxHeight('500px');
		}
		
		// Set the width
		if (properties.width) {
			view.width(properties.width);
		} else {
			view.width('500px');
		}
		
		// Enable the button
		$('#btn-modal').on('click', clicked);
		
		view.show();
	};
	
	var clicked = function () {		
		// Disable the button
		$('#btn-modal').off();
		
		view.hide(done);
	};
	
	var done = function () {
		actions.done();
	};
	
	// optional one-time init procedures
	actions.register('ui_modal');
	
	// public properties and methods
	return {
		run: run
	};
	
}();

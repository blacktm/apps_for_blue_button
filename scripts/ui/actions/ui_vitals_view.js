/**
 * ui_vitals_view.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_vitals_view');

APPYARD.UI.Actions.ui_vitals_view = function () {

	// dependencies
	var ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;

	// private properties

	// private methods
	var run = function (properties) {
		
		
		actions.done();
	};

	// optional one-time init procedures
	actions.register('ui_vitals_view');

	// public properties and methods
	return {
		run: run
	};

}();

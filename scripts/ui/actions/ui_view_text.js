/**
 * ui_blue_button_download.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_view_text');

APPYARD.UI.Actions.ui_view_text = function () {
	
	// dependencies
	var ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;
	
	// private properties
	
	// private methods
	var run = function (properties) {

		var text = actions.getData();
		
		switch (properties.format) {
		case 'json':
			// Pretty print
			text = JSON.stringify($.parseJSON(text), undefined, 2);
			break;
		case 'xml':
			text = text.replace(/</g,'&#60;');
			break;
		default:
		}
		
		console.log(text);
		
		view.Header.add(properties.title);
		view.Content.add('<pre>' + text + '</pre>');
		view.Content.maxHeight('450px');
		view.width('800px');
		
		$('pre').css('overflow', 'inherit');
		
		view.show();
		
		// BUG: '%' in Blue Button data is crashing server on POST
		//   Temp fix: Overwrite BB data with empty string
		actions.saveData('');
		
		actions.done();
	};
	
	// optional one-time init procedures
	actions.register('ui_view_text');
	
	// public properties and methods
	return {
		run: run
	};
	
}();

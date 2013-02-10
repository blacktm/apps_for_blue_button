/**
 * ui_prompt_blue_button.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_prompt_blue_button');

APPYARD.UI.Actions.ui_prompt_blue_button = function () {
	
	// dependencies
	var core = APPYARD.Core,
			ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;
	
	// private properties
	var BB_ENCODED = "";
	
	// private methods
	var run = function (properties) {
		
		$.get('/blue_button_sample.txt', function(data) {
			BB_ENCODED = encodeURI(data);
		});
		
		view.Header.add(properties.title);
		view.Content.add("<div class='center big-text'><a id='fill-blue-button' href='javascript:;'>Use sample data.</a></div><br><textarea id='blue-button-text-field' rows='20' cols='80' style='font-size:16px;font-family:monospace;'></textarea>");
		view.Content.maxHeight('700px');
		view.Footer.add(view.Button.modal);
		view.width('auto');
		
		// Enable the button
		$('#btn-modal').on('click', nextButton);
		
		view.show();
		$('#blue-button-text-field').focus();
		$('#fill-blue-button').on('click', fillBlueButton);
	};
	
	var fillBlueButton = function () {
		$('#blue-button-text-field').empty();
		$('#blue-button-text-field').val(decodeURI(BB_ENCODED));
	}
	
	var nextButton = function () {
		var text = $('#blue-button-text-field').val();
		
		text = encodeURI(text);
		actions.saveData(text);
		
		view.hide(done); // Call done() after hiding modal
	};
	
	var done = function () {
		actions.done();
	};
	
	// optional one-time init procedures
	actions.register('ui_prompt_blue_button');
	
	// public properties and methods
	return {
		run: run
	};
	
}();

/**
 * core.js
 */

APPYARD.define('APPYARD.Core');

APPYARD.Core = function () {
	
	// dependencies
	
	// private properties
	
	// private methods
	var runService = function (request) {
		request = JSON.stringify(request);
		$.ajax({
			type: 'POST',
			url: '/',
			data: request,
			dataType: 'json',
			success: function(result) {
				serviceResult(result);
			}
		});
	};
	
	var serviceResult = function (result) {
		switch(result.status) {
			case 'ui':
				runUIAction(result.app);
				break;
			case 'done':
				appFinished();
				break;
		}
	};
	
	var runApp = function (app) {
		var nextAction = app.actions[app.next];
		
		// If the next action is undefined, the app is finished
		if (nextAction !== undefined) {
			// If the next action is a UI action, run it (don't hit the server)
			if (nextAction.name.slice(0, 2) === 'ui') {
				runUIAction(app);
			} else {
				runService({
					service: 'run_app',
					app: app
				});
			}
		} else {
			appFinished();
		}
	};
	
	var runUIAction = function (app) {
		console.log("Running: " + app.actions[app.next].name);
		APPYARD.UI.Actions.run(app);
	};
	
	var appFinished = function () {
		console.log("App finished.");
	};
	
	// optional one-time init procedures

	// public properties and methods
	return {
		runApp: runApp
	};
	
}();

/**
 * actions.js
 */

APPYARD.define('APPYARD.UI.Actions');

APPYARD.UI.Actions = function () {
	
	// dependencies
	var ui = APPYARD.UI,
			core = APPYARD.Core;
	
	// private properties
	var actionManifest = [],
			currentApp = null;
	
	// private methods
	var run = function (app) {
		currentApp = app;
		var currentAction = app.actions[app.next];
		
		if (lookup(currentAction.name)) {
			actionRef = eval("APPYARD.UI.Actions." + currentAction.name);
			actionRef.run(currentAction.properties);
		} else {
			console.log("Error: UI action does not exist.");
			return;
		}
	};
	
	var lookup = function (actionName) {
		if (actionManifest.indexOf(actionName) !== -1) {
			return true;
		} else {
			return false;
		}
	};
	
	var register = function (actionName) {
		actionManifest.push(actionName);
	};
	
	var getData = function () {
		return currentApp.data;
	};
	
	var saveData = function (newData) {
		currentApp.data = newData;
	};
	
	var done = function () {
		currentApp.next += 1;
		core.runApp(currentApp);
	};
	
	// optional one-time init procedures
	
	// public properties and methods
	return {
		run: run,
		register: register,
		getData: getData,
		saveData: saveData,
		done: done
	};
	
}();

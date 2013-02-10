/**
 * runner.js
 */

APPYARD.define('APPYARD.Runner');

APPYARD.Runner = function () {
	
	// dependencies
	
	// private properties
	
	// private methods
	
	// optional one-time init procedures
	$(document).ready(function() {
		APPYARD.Core.runApp(CURRENT_APP);
  });
  
	// public properties and methods
	return {
	};
	
}();

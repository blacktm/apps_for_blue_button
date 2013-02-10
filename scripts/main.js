/**
 * main.js
 */

var APPYARD = APPYARD || {};

APPYARD.define = function (name) {
	var parts = name.split('.'),
		parent = APPYARD,
		i;
	
	// strip redundant leading global
	if (parts[0] === 'APPYARD') {
		parts = parts.slice(1);
	}
	
	for (i = 0; i < parts.length; i++) {
		// create a property if it doesn't exist
		if (typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

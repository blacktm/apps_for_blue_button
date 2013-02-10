/**
 * view.js
 */

APPYARD.define('APPYARD.UI.View');

APPYARD.UI.View = function () {
	
	// dependencies
	
	// private properties
	var delay = 300;
	
	// private methods
	var addView = function () {
		$('body').append('<div id="view"></div>');
	};
	
	var removeView = function () {
		$('#view').remove();
	};
	
	var setPosition = function () {
		var marginTop = ($('#view').height() / 2) * -1,
				marginBtm = ($('#view').width() / 2) * -1;
		
		marginTop += $('.header').height() / 2;
		
		$('#view').css('margin-top', marginTop);
		$('#view').css('margin-left', marginBtm);
	};
	
	var show = function () {
		setPosition();
		$('#view').fadeIn(delay);
	};
	
	var hide = function (callback) {
		$('#view').fadeOut(delay, function() {
			removeView();
			addView();
			
			if (callback !== undefined) {
				callback();
			}
		});
	};
	
	var addDiv = function (options) {
		if (options.id) {
			$('#view').append('<div id="' + options.id + '"></div>');
		}
	};
	
	var append = function (options) {
		$('#' + options.id).append(options.content);
	};
	
	var width = function (w) {
		if (w) {
			$('#view').css('width', w);
		} else {
			return $('#view').width();
		}
	};
	
	var height = function (h) {
		if (h) {
			$('#view').css('height', h);
		} else {
			return $('#view').height();
		}
	};
	
	var minHeight = function (h) {
		$('#view').css('min-height', h);
	};
	
	var maxHeight = function (h) {
		$('#view').css('max-height', h);
	};
	
	// optional one-time init procedures
	addView();
	setPosition();
	
	// public properties and methods
	return {
		show: show,
		hide: hide,
		addDiv: addDiv,
		append: append,
		width: width,
		height: height,
		minHeight: minHeight,
		maxHeight: maxHeight,
		setPosition: setPosition
	};
	
}();

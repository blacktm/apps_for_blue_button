/**
 * ui_lab_view.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_lab_view');

APPYARD.UI.Actions.ui_lab_view = function () {
	
	// dependencies
	var ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;
	
	// private properties
	var canvas = null;
	
	var labs = [
		{
			name: 'Total Cholesterol',
			abbr: 'chol',
			units: 'mg/dL',
			val: null,
			range: {
				min: 150,
				max: 300
			},
			range_pts: [{
				title: 'Desirable',
				pos: 150
			}, {
				title: 'Borderline',
				pos: 200
			}, {
				title: 'High',
				pos: 240
			}],
			info: "Total blood cholesterol is a measure of LDL cholesterol, HDL cholesterol, and other lipid components. Doctors recommend total cholesterol levels below 200.",
			source: {
				title: "Bob Saget Hospital",
				link: "http://www.apple.com"
			}
		},
		
		{
			name: 'Triglycerides',
			abbr: 'tg',
			units: 'mg/dL',
			val: null,
			range: {
				min: 100,
				max: 550
			},
			range_pts: [{
				title: 'Normal',
				pos: 100
			}, {
				title: 'Borderline',
				pos: 150
			}, {
				title: 'High',
				pos: 200
			}, {
				title: 'Very High',
				pos: 500
			}],
			info: "Triglycerides are the chemical form in which most fat exists in food and the body. A high triglyceride level has been linked to higher risk of coronary artery disease.",
			source: {
				title: "Bob Saget Hospital",
				link: "http://www.apple.com"
			}
		},
		
		{
			name: 'Low-density lipoprotein (LDL)',
			abbr: 'ldl',
			units: 'mg/dL',
			val: null,
			range: {
					min: 70,
					max: 220
			},
			range_pts: [{
				title: 'Optimal',
				pos: 70
			}, {
				title: 'Near Optimal',
				pos: 100
			}, {
				title: 'Borderline',
				pos: 130
			}, {
				title: 'High',
				pos: 160
			}, {
				title: 'Very High',
				pos: 190
			}],
			info: "LDL cholesterol can build up on the walls of your arteries and increase your chances of getting heart disease. That is why LDL cholesterol is referred to as \"bad\" cholesterol.",
			source: {
				title: "Bob Saget Hospital",
				link: "http://www.apple.com"
			}
		},
		
		{
			name: 'High-density lipoprotein (HDL)',
			abbr: 'hdl',
			units: 'mg/dL',
			val: null,
			range: {
				min: 90,
				max: 30
			},
			range_pts: [{
				title: 'Optimal',
				pos: 90
			}, {
				title: 'Borderline',
				pos: 60
			}, {
				title: 'Low',
				pos: 40
			}],
			info: "When it comes to HDL cholesterol -- \"good\" cholesterol -- the higher the number, the lower your risk.",
			source: {
				title: "Bob Saget Hospital",
				link: "http://www.apple.com"
			}
		}
	];
	
	var box = {
		x: 25,
		y: 40,
		width: 750,
		height: 180,
		margin: 25
	};
	
	var bar = {
		y: 45,
		width: box.width,
		height: 50,
		background: {
			fill: '270-#d8d8d8-#f3f3f3',
			stroke: '#bfbfbf'
		},
		line: {
			width: 2,
			first: {
				fill: '#000',
				opacity: '0.15'
			},
			second: {
				fill: '#fff',
				opacity: '0.3'
			}
		},
		color: {
			green: {
				s1: '#92d614',
				s2: '#43a409',
				border: '#328d07'
			},
			orange: {
				s1: '',
				s2: '',
				border: ''
			},
			red: {
				s1: '',
				s2: '',
				border: ''
			}
		},
		animation: {
			type: 'backOut',
			delay: 750,
			duration: 750
		}
	};
	
	var font = {
		family: 'proxima-nova',
		lab: {
			size: 30,
			weight: 'bold',
			fill: 'black'
		},
		val: {
			size: 24,
			weight: 'bold',
			fill: '#fff',
			shadow: {
				y: 2,
				fill: '#000',
				opacity: 0.3
			}
		},
		range: {
			text: {
				size: 16,
				weight: 'bold',
				fill: '#808080'
			},
			val: {
				size: 16,
				weight: 'bold',
				fill: '#808080'
			}
		}
	};
	
	// private methods
	var run = function (properties) {
		
		view.width('auto');
		view.maxHeight(ui.height() - 150);
		view.minHeight('300px');
		
		
		view.Header.add(properties.title);
		view.Content.add('<div id="canvas"></div>');
		
		// Assign some labs
		var labData = actions.getData();
		labs[0].val = labData.chol;	// chol
		labs[1].val = labData.tg;		// tg
		labs[2].val = labData.ldl;	// ldl
		labs[3].val = labData.hdl;	// hdl
		
		view.show();
		start();
		
		view.Content.maxHeight(ui.height() - 150 - 100);
		view.setPosition();
		
		actions.done();
	};
	
	var start = function () {
		// MAIN ////////////////////////////////////////////////
		
		var canvasHeight = (box.y + box.height) * labs.length;
		
		canvas = Raphael('canvas', 800, canvasHeight);
		
		for (var i = 0; i < labs.length; i++) {
			drawLab(labs[i]);
			box.y += box.height + box.margin;
		}
	};
	
	var drawLab = function (lab) {
		// Draw Lab Title
		canvas.add([{
			type: 'text',
			text: lab.name + ' (' + lab.units + ')',
			x: box.x,
			y: box.y + 15,
			'text-anchor': 'start',
			'font-family': font.family,
			'font-size': font.lab.size,
			'font-weight': font.lab.weight,
			fill: font.lab.fill
		}]);
		
		// Draw the info button (question mark)
		drawHelp(lab.info);
		
		// Draw Background Bar
		canvas.add([{
			type: 'rect',
			x: box.x,
			y: box.y + bar.y,
			r: 3,
			width: bar.width,
			height: bar.height,
			fill: bar.background.fill,
			stroke: bar.background.stroke
		}]);
		
		// Draw the lab value bar
		var r = canvas.rect(box.x, box.y + bar.y, 0, bar.height).attr({
			r: 3,
			fill: '270-' + bar.color.green.s1 + '-' + bar.color.green.s2,
			stroke: bar.color.green.border
		});
		
		// Draw the Ranges and Points
		for (var i = 0; i < lab.range_pts.length; i++) {
			drawRangePt(lab.range, lab.range_pts[i]);
		}
		
		// Get the x position for the lab value
		var xpos = mapPt(lab.val, lab.range, {min: box.x, max: box.x + bar.width});
		
		// Draw the lab value (on the bar)
		canvas.add([
			// Value (shadow)
			{
				type: 'text',
				text: lab.val,
				x: xpos - 10,
				y: box.y + bar.y + (bar.height / 2) + font.val.shadow.y + 1,
				'text-anchor': 'end',
				'font-family': font.family,
				'font-size': font.val.size,
				'font-weight': font.val.weight,
				fill: font.val.shadow.fill,
				opacity: font.val.shadow.opacity
			},
			// Value (text)
			{
				type: 'text',
				text: lab.val,
				x: xpos - 10,
				y: box.y + bar.y + (bar.height / 2) + 1,
				'text-anchor': 'end',
				'font-family': font.family,
				'font-size': font.val.size,
				'font-weight': font.val.weight,
				fill: font.val.fill
			}
		]);
		
		// Display the bar (with animation)
		setTimeout(function () {
			r.animate({width: xpos - box.x}, bar.animation.duration, bar.animation.type);
		}, bar.animation.delay);
	};
	
	var drawBox = function () {
		canvas.add([
			{
				type: 'rect',
				x: box.x,
				y: box.y,
				width: box.width,
				height: box.height,
				stroke: 'blue'
			}
		]);
	};
	
	var mapPt = function(pt, el, ui) {
		
		// Ok, a lot going on in one line of code. Let's break it down...
		// The goal is to map an arbitrary element on a UI coordinate system.
		// First, move the beginning of the element to the origin.
		//   pt - el.min
		// Next, scale the element range to match the UI range.
		//   scale_factor = ui_length / el_length
		// or...
		//   scale_f = (ui.max - ui.min) / (el.max - el.min)
		// Then, multiply the pt by the scale_f.
		// Finally, move the pt over by the x offset of the UI range
		//   pt + ui.min
		
		// This will also work if you reverse the range,
		// say if the element goes from a higher number to a lower one.
		
		return (pt - el.min) * ((ui.max - ui.min) / (el.max - el.min)) + ui.min
	};
	
	// SUPPORTING DRAW FUNCTIONS ///////////////////////////
	
	var drawHelp = function (infoMsg) {
		var q = canvas.path('M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M17.328,24.371h-2.707v-2.596h2.707V24.371zM17.328,19.003v0.858h-2.707v-1.057c0-3.19,3.63-3.696,3.63-5.963c0-1.034-0.924-1.826-2.134-1.826c-1.254,0-2.354,0.924-2.354,0.924l-1.541-1.915c0,0,1.519-1.584,4.137-1.584c2.487,0,4.796,1.54,4.796,4.136C21.156,16.208,17.328,16.627,17.328,19.003z');    
		
		q.attr({
			fill: '270-#dadada-#808080',
			stroke: 'none'
		});
		
		var qbox = q.getBBox(true);
		var qrect = canvas.rect(qbox.x - 1, qbox.y - 1, qbox.width + 2, qbox.height + 2);
		
		qrect.attr({
			cursor: 'pointer',
			fill: 'white',
			'fill-opacity': 0,
			stroke: 'none'
		});
		
		q.translate(box.width - 7, box.y);
		qrect.translate(box.width - 7, box.y);
		
		qrect.hover(
			function () {
				qrect.animate({'fill-opacity': 0.2}, 300, '<>');
			},
			function () {
				qrect.animate({'fill-opacity': 0}, 500, '<>');
			}
		);
		
		var sayHi = function () { alert(infoMsg) };
		qrect.click(sayHi);
	};
	
	var drawRangePt = function (range, rangePt) {
		var xpos = mapPt(rangePt.pos, range, {min: box.x, max: box.x + bar.width});
		
		var firstLineOpacity = bar.line.first.opacity,
				secondLineOpacity = bar.line.second.opacity;
		
		if ((xpos - box.x) < 10) {
			firstLineOpacity = 0;
			secondLineOpacity = 0;
		}
		
		canvas.add([
			// Line (primary - dark)
			{
				type: 'rect',
				x: xpos - 2,
				y: box.y + bar.y + 0.5,
				width: bar.line.width,
				height: bar.height - 1,
				fill: bar.line.first.fill,
				stroke: 'none',
				opacity: firstLineOpacity
			},
			
			// Line (secondary - light)
			{
				type: 'rect',
				x: xpos,
				y: box.y + bar.y + 0.5,
				width: bar.line.width,
				height: bar.height - 1,
				fill: bar.line.second.fill,
				stroke: 'none',
				opacity: secondLineOpacity
			},
			
			// Range Text
			{
				type: 'text',
				text: rangePt.title,
				x: xpos,
				y: box.y + bar.y + bar.height + 15,
				'text-anchor': 'start',
				'font-family': font.family,
				'font-size': font.range.text.size,
				'font-weight': font.range.text.weight,
				fill: font.range.text.fill
			},
			
			// Range Value
			{
				type: 'text',
				text: rangePt.pos,
				x: xpos,
				y: box.y + bar.y + bar.height + 35,
				'text-anchor': 'start',
				'font-family': font.family,
				'font-size': font.range.val.size,
				fill: font.range.val.fill
			}
		]);
	};
	
	// optional one-time init procedures
	actions.register('ui_lab_view');
	
	// public properties and methods
	return {
		run: run
	};
	
}();

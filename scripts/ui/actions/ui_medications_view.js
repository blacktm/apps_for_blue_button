/**
 * ui_medications_view.js
 */

APPYARD.define('APPYARD.UI.Actions.ui_medications_view');

APPYARD.UI.Actions.ui_medications_view = function () {
	
	// dependencies
	var ui = APPYARD.UI,
			actions = ui.Actions,
			view = ui.View;
	
	// private properties
	
	// private methods
	var run = function (properties) {
		
		var meds = actions.getData();
		console.log(meds)
		
		view.width('auto');
		view.maxHeight(ui.height() - 150);
		view.minHeight('300px');
		
		view.Header.add(properties.title);
		view.Content.add();
		view.Content.maxHeight(ui.height() - 150 - 100);
		
		for (var i = 0; i < meds.length; i++) {
			addMeds(meds[i]);
		}
		
		$('#view-content').css('overflow-y', 'inherit');
		$('.med').css('width', 'auto');
		$('.med').css('margin-bottom', '25px');
		$('.med').css('overflow', 'inherit');
		$('.med h1').css('font-size', '22px');
		$('.med p').css('font-size', '18px');
		$('.med-img').css('float', 'left');
		$('.med-content').css('padding-top', '25px');
		$('.med-content').css('margin-left', '275px');
		
		view.show();
		view.setPosition();
		actions.done();
	};
	
	var addMeds = function (med) {
		
		var img = med.Medication.toLowerCase().replace(/[ ,\/]/g, '_');
		var name = med.Medication.replace(/[,\/]/g, ' ').toTitleCase();
		var refills = med['Refills Remaining'];
		var lastFilled = med['Last Filled On'];
		
		var content = '' +
		'<div class="med">' +
			'<img class="med-img" src="/apps/medications/img/' + img + '.jpg">' +
			'<div class="med-content">' +
				'<h1 class="med-name">' + name + '</h1>' +
				'<p class="med-last-filled">Last Filled: ' + lastFilled + '</p>' +
				'<p class="med-refills">Refills remaining: ' + refills + '</p>' +
				'<p class="med-price"><a href="http://www.goodrx.com/price/' + img.split('_')[0] + '" target="_blank">Check price &rsaquo;&rsaquo;</a></p>' +
			'</div>' +
		'</div>';
		console.log(content);
		
		view.Content.append(content);
	};
	
	String.prototype.toTitleCase = function () {
		return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};
	
	// optional one-time init procedures
	actions.register('ui_medications_view');
	
	// public properties and methods
	return {
		run: run
	};
	
}();

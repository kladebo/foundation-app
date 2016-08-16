(function () {
	'use strict';

	angular.module('allstar.form')

	.component('allstarForm', {
		templateUrl: 'templates/allstar-form.template.html',
		bindings: {
			view: '<',
			onEdit: '&'
		},
		controller: [
		function allstarFormCtrl() {
			var self = this;
			self.title = 'Allstar Form';


			self.$onChanges = function (changes) {
				// console.info(self.title, changes);
				if(changes.view.currentValue){
					self.view = changes.view.currentValue;
				}
			};


			self.changed = function(form){
				// console.log('changed:', '\nallstar',allstar, '\nform',form);
				self.onEdit({'form' :form});
			};

		}]
	});

})();

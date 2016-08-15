(function () {
	'use strict';

	angular.module('allstar.list')

	.component('allstarList', {
		templateUrl: 'templates/allstar-list.template.html',
		bindings: {
			players: '<',
			view: '<',
			// onClick: '@'
		},
		controller: ['$http',
		function allstarListCtrl($http) {
			var self = this;
			self.title = 'Allstar List';

			self.$onChanges = function (changes) {
				console.info(self.title, changes);
				if(changes.players.currentValue){
					self.filtered_players = changes.players.currentValue;
				}

				if(changes.view && changes.view.currentValue){
					self.view = changes.view.currentValue;
				}
			};

		}]
	});

})();

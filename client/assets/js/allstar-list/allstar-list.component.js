(function () {
	'use strict';

	angular.module('allstar.list')

	.component('allstarList', {
		templateUrl: 'templates/allstar-list.template.html',
		controller: ['$http',
		function allstarListCtrl($http) {
			var self = this;

			self.view = {
				'items': 10
			};

			self.checkMinimum = function(){
				if(self.view.items < 10 || self.view.items > 100){
					self.view.items = 10;
				}
			};

			// self.filtered_players = '';

			$http.get('assets/json/allstarfull.json').then(function(response){
				console.log(response);
				self.filtered_players = response.data.players;
			});
		}]
	});

})();
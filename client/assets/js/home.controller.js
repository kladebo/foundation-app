(function () {
	'use strict';

	angular.module('home')

	.controller('HomeCtrl', ['$scope', '$http', '$filter',
		function($scope, $http, $filter) {
			var self = $scope;
			self.app = {};
			self.app.title = 'Allstar';
			self.app.subtitle = 'angular app';

			self.view = {
				'resultCountList': [10,25,50,100],
				'resultCount': 10,
				'fields': {
					a:{'id': 'a',filter:'',list:false},
					b:{'id': 'b',filter:'',list:true},
					c:{'id': 'c',filter:'',list:true},
					d:{'id': 'd',filter:'',list:false},
					e:{'id': 'e',filter:'',list:true},
					f:{'id': 'f',filter:'',list:true},
					g:{'id': 'g',filter:'',list:true},
					h:{'id': 'h',filter:'',list:true}
				}
			};


			$http.get('assets/json/allstarfull.json').then(function(response){
				var data = response.data;

				// create main vars
				self.players = data.players;
				angular.forEach(self.players, function (player, index) {
					player.id = 'p_'+index;
				})


				self.filtered_players = angular.copy(self.players);

				self.headers = data.headers;
				


				// copy header info to view Obj
				angular.forEach(self.headers, function(header){
					if(self.view.fields[header.id]){
						self.view.fields[header.id].label = header.value;
					}
				});



				// make some lists out of the data
				angular.forEach(self.view.fields, function(field){
					if(field.list){
						field.list = makeUnique(self.players, field.id);
					}
				});


				// check for correctnes
				// console.log($filter('json')(self.view, 6));
			});

			self.filterPlayers = function (arg) {


				var players = angular.copy(self.players);

				angular.forEach(self.view.fields, function(field){
					players = $filter('allstarFilter')(players, field.id, field.value);
				});
				
				self.filtered_players = players;
			};


		/*
		 *	makes a unique array from a multivalue list
		 *	list: the list to use
		 *	field: the field to filter the list with
		 */

		 function makeUnique(list, field){

		 	var unique = list.map(function (item) {
		 		return item[field];
		 	}).filter(function (item, index, a) {
				//console.log(item, index , a);
				return index === a.indexOf(item);
			});

			// reset value 'undefined' to 'blank'...
			// search.filter uses this value also...
			angular.forEach(unique, function(item, index){
				if(angular.isUndefined(item)){
					unique[index] = 'blank';
				}
			});

			return unique;
		}
	}]);

})();

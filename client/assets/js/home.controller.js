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
				resultCountList: [10,25,50,100],
				resultCount: 10,
				// fields: {
				// 	a:{id: 'a',filter:'',list:false},
				// 	b:{id: 'b',filter:'',list:false},
				// 	c:{id: 'c',filter:'',list:true},
				// 	d:{id: 'd',filter:'',list:true},
				// 	e:{id: 'e',filter:'',list:true},
				// 	f:{id: 'f',filter:'',list:true},
				// 	g:{id: 'g',filter:'',list:true},
				// 	h:{id: 'h',filter:'',list:true}
				// },

				fields: [
					{id: 'a',filter:'',list:false},
					{id: 'b',filter:'',list:false},
					{id: 'c',filter:'',list:true},
					{id: 'd',filter:'',list:true},
					{id: 'e',filter:'',list:true},
					{id: 'f',filter:'',list:true},
					{id: 'g',filter:'',list:true},
					{id: 'h',filter:'',list:true}
				],

				getField: function(id){
					return self.view.fields.filter(function(field){
						return field.id === id;
					})[0];
				}
			};

			console.log(self.view.getField('b'));


			$http.get('assets/json/allstarfull.json').then(function(response){
				var data = response.data;

				// create main vars
				self.players = data.players;
				angular.forEach(self.players, function (player, index) {
					player.id = 'p_'+index;
				});


				self.filtered_players = angular.copy(self.players);

				self.headers = data.headers;
				
				angular.forEach(self.view.fields, function(field){
					if(field.list){
						field.list = makeUnique(self.players, field.id);
					}
					field.label = $filter('filter')(self.headers, {id:field.id}, true)[0].value;
				});


				// check for correctnes
				// console.log($filter('json')(self.view, 4));
			});

			self.filterPlayers = function () {


				var players = angular.copy(self.players);

				angular.forEach(self.view.fields, function(field){
					players = $filter('allstarFilter')(players, field.id, field.value);
				});

				self.filtered_players = players;
				
				// check for correctnes
				// console.log($filter('json')(self.view.fields.d, 4));
				
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
			// allstar.filter uses this value also...
			angular.forEach(unique, function(item, index){
				if(angular.isUndefined(item) || item === ''){
					unique[index] = 'blank';
				}
				unique[index] = {id:unique[index], type:typeof item};
			});

			unique = $filter('orderBy')(unique, 'id', false);



			return unique;
		}
	}]);

})();

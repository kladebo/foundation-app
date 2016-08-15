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
				'items': 15,
				'fields': {
					a:{'id': 'a'},
					b:{'id': 'b'},
					c:{'id': 'c'},
					d:{'id': 'd'},
					e:{'id': 'e'},
					f:{'id': 'f'},
					g:{'id': 'g'}
				}
			};


			$http.get('assets/json/allstarfull.json').then(function(response){
				self.players = response.data.players;
				self.filtered_players = angular.copy(self.players);

				self.view.fields.c.list = makeUnique(self.players, 'c');
			});

			self.filterPlayers = function (arg) {
				// console.log(arg);

				var filters = self.view.fields;
				var players = angular.copy(self.players);

				// self.filtered_players = angular.copy(self.players);
				angular.forEach(filters, function (obj, iterator, context){
					if(obj.value){
						// console.log(obj, iterator);
						players = players.filter(function(item){
							//console.log(item[obj.id].indexOf(obj.value) >= 0);
							//console.log($filter('json')(obj,6), typeof obj.value);

							if(typeof obj.value === 'string'){
								return item[obj.id].toString().indexOf(obj.value.toString()) === 0;
							}else if(typeof obj.value === 'object'){
								// return match(obj.value)
								var t = [];
								var v = '';
								for(var i in obj.value){
									if(obj.value[i] === true){
										t.push(i);
									}
								}
								t = t.join(',');
								// console.log(t);
								if(t === ''){
									return true;
								}else{
									t = ','+t+',';
									v = ','+item[obj.id].toString()+',';
									// console.log(t,v);
									return t.indexOf(v) >= 0;
									// return false;
								}

								// return false;
							}
						});
					}
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

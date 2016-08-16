(function () {
	'use strict';

	angular.module('utils')

	.filter('allstarFilter', function() {
		return function(items, field, value) {
			//console.log(items, field, value);			
			var accepted = [],
				delimiter = ',',
				fieldvalue,
				testvalue;


			// check for validity	
			if(angular.isUndefined(value) || value === null){

				// return when undefined or null
				return items;

			}else if(angular.isObject(value)){

				// convert obj to string to find activated items
				testvalue = [];

				for(var i in value){
					if(value[i] === true){
						testvalue.push(i);
					}
				}
				testvalue = testvalue.join(delimiter);
				if(testvalue !== ''){
					testvalue = delimiter+testvalue+delimiter;
				}else{
					// return when no active values found
					return items;
				}

			}


			angular.forEach(items, function(item){

				fieldvalue = angular.isUndefined(item[field]) ? 'blank' : item[field].toString();

				if(angular.isObject(value)){

					fieldvalue = delimiter + fieldvalue + delimiter;

					if(testvalue.indexOf(fieldvalue) >= 0){
						accepted.push(item);
					}
				}else if(fieldvalue.indexOf(value) >= 0){
					accepted.push(item);
				}

			});
			return accepted;
		};
	});


})();
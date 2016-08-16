(function() {
  'use strict';

  angular.module('application', [
    'utils',
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',

    //custom
    'home',
    'allstar.list',
    'allstar.form'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

  }

  function run() {
    FastClick.attach(document.body);
    // console.log(angular.version);
  }

})();

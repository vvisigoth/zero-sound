'use strict';

angular.module('zeroSoundApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/layout', {
        templateUrl: 'views/layout.html',
        controller: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

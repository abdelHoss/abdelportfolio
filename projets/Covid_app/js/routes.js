const covidApp = angular.module('covidApp', ['ngRoute','ngAnimate']);
 covidApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


     $locationProvider.html5Mode(true);

     $routeProvider
         .when('/', {
             templateUrl: 'views/home.html'
         })
         .when('/covid-news', {
            templateUrl: 'views/feeds.html',
            controller: 'mapController'
         })
         .when('/world-data', {
            templateUrl: 'views/map.html',
            controller: 'mapController'
         })
         .when('/countries', {
             templateUrl: 'views/worldTab.html',
             controller: 'covidController'
         })
         .otherwise({
             redirectTo: '/'
         });
 }]);

 const covidApp = angular.module('covidApp', ['ngRoute','ngAnimate']);
 covidApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
// const gitUrl = 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/';

     $locationProvider.html5Mode(true);

     $routeProvider
         .when('/', {
             templateUrl: 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/views/home.html'
         })
         .when('/covid-news', {
            templateUrl: 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/views/feeds.html',
            controller: 'mapController'
         })
         .when('/world-data', {
            templateUrl: 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/views/map.html',
            controller: 'mapController'
         })
         .when('/countries', {
             templateUrl: 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app/views/worldTab.html',
             controller: 'covidController'
         })
         .otherwise({
             redirectTo: '/'
         });
 }]);

 const covidApp = angular.module('covidApp', ['ngRoute','ngAnimate']);
 covidApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
const gitUrl = 'https://abdelhoss.github.io/abdelportfolio/projets/Covid_app';

     $locationProvider.html5Mode(true);

     $routeProvider
         .when(gitUrl+'/', {
             templateUrl: 'views/home.html'
         })
         .when(gitUrl+'/covid-news', {
            templateUrl: 'views/feeds.html',
            controller: 'mapController'
         })
         .when(gitUrl+'/world-data', {
            templateUrl: 'views/map.html',
            controller: 'mapController'
         })
         .when(gitUrl+'/countries', {
             templateUrl: 'views/worldTab.html',
             controller: 'covidController'
         })
         .otherwise({
             redirectTo: '/'
         });
 }]);
